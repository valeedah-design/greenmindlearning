import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Plus, Pencil, Trash2, X, Upload, ChevronDown, ChevronUp, Loader2, ImagePlus } from "lucide-react";
import api, { fileUrl, uploadFile, getErrorMessage } from "../api";
import { getReadableTextColor } from "../lib/colors";
import { ErrorBanner, Spinner, EmptyState } from "../components/Feedback";
import AuditNote from "../components/AuditNote";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const LEVELS = ["Foundational", "Intermediate", "Advanced"];

const EMPTY_FORM = {
  title: "",
  type: "",
  topic: "",
  level: LEVELS[0],
  minutes: "",
  description: "",
  thumbnail: "",
  images: [],
};

function TaxonomyChip({ item, onDelete, deleting }) {
  const textColor = getReadableTextColor(item.color);
  return (
    <span
      className="inline-flex items-center gap-1.5 pl-3 pr-1.5 py-1 rounded-full text-xs font-semibold"
      style={{ backgroundColor: item.color || "#e5e7eb", color: textColor }}
    >
      {item.name}
      <button
        type="button"
        onClick={() => onDelete(item)}
        disabled={deleting}
        title={`Delete "${item.name}"`}
        className="rounded-full p-0.5 hover:bg-black/10 disabled:opacity-50"
      >
        {deleting ? <Loader2 className="h-3 w-3 animate-spin" /> : <X className="h-3 w-3" />}
      </button>
    </span>
  );
}

function TaxonomyGroup({ title, items, onAdd, onDelete }) {
  const [name, setName] = useState("");
  const [color, setColor] = useState("#177A3B");
  const [adding, setAdding] = useState(false);
  const [deletingId, setDeletingId] = useState(null);
  const [err, setErr] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    if (!name.trim()) return;
    setErr("");
    setAdding(true);
    try {
      await onAdd({ name: name.trim(), color });
      setName("");
    } catch (error) {
      setErr(getErrorMessage(error, "Couldn't add that. Please try again."));
    } finally {
      setAdding(false);
    }
  };

  const handleDelete = async (item) => {
    if (!window.confirm(`Delete "${item.name}"? Materials using it will keep the label as plain text.`)) return;
    setErr("");
    setDeletingId(item.id);
    try {
      await onDelete(item);
    } catch (error) {
      setErr(getErrorMessage(error, "Couldn't delete that. Please try again."));
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div>
      <h3 className="text-sm font-bold text-ink mb-2">{title}</h3>
      <div className="flex flex-wrap gap-2 mb-3 min-h-[2rem]">
        {items.length === 0 && <span className="text-xs text-slate-400">None yet.</span>}
        {items.map((item) => (
          <TaxonomyChip key={item.id} item={item} onDelete={handleDelete} deleting={deletingId === item.id} />
        ))}
      </div>
      <form onSubmit={submit} className="flex flex-wrap items-center gap-2">
        <Input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder={`New ${title.toLowerCase().replace(/s$/, "")} name`}
          className="h-8 max-w-[180px] text-sm"
        />
        <input
          type="color"
          value={color}
          onChange={(e) => setColor(e.target.value)}
          className="h-8 w-10 rounded-md border border-input cursor-pointer bg-transparent"
          aria-label={`${title} color`}
        />
        <Button type="submit" size="sm" disabled={adding || !name.trim()} className="bg-forest hover:bg-forest-dark text-white h-8">
          {adding ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Plus className="h-3.5 w-3.5" />}
          Add
        </Button>
      </form>
      {err && <p className="mt-2 text-xs text-red-600">{err}</p>}
    </div>
  );
}

function ImageUploadField({ label, url, onChange, uploading, setUploading, setErr }) {
  const inputRef = useRef(null);

  const handleFile = async (e) => {
    const file = e.target.files?.[0];
    e.target.value = "";
    if (!file) return;
    setErr("");
    setUploading(true);
    try {
      const uploadedUrl = await uploadFile(file);
      onChange(uploadedUrl);
    } catch (error) {
      setErr(getErrorMessage(error, "Image upload failed. Please try again."));
    } finally {
      setUploading(false);
    }
  };

  return (
    <div>
      <Label className="text-sm font-semibold text-ink">{label}</Label>
      <div className="mt-1.5 flex items-center gap-3">
        <div className="h-16 w-16 rounded-lg border border-slate-200 bg-slate-50 overflow-hidden flex items-center justify-center shrink-0">
          {url ? (
            <img src={fileUrl(url)} alt="" className="h-full w-full object-cover" />
          ) : (
            <ImagePlus className="h-5 w-5 text-slate-300" />
          )}
        </div>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => inputRef.current?.click()}
          disabled={uploading}
        >
          {uploading ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Upload className="h-3.5 w-3.5" />}
          {url ? "Replace" : "Upload"}
        </Button>
        {url && (
          <Button type="button" variant="ghost" size="sm" onClick={() => onChange("")}>
            Remove
          </Button>
        )}
        <input ref={inputRef} type="file" accept="image/*" className="hidden" onChange={handleFile} />
      </div>
    </div>
  );
}

function CarouselImagesField({ images, onChange, setErr }) {
  const inputRef = useRef(null);
  const [uploading, setUploading] = useState(false);

  const handleFiles = async (e) => {
    const files = Array.from(e.target.files || []);
    e.target.value = "";
    if (files.length === 0) return;
    setErr("");
    setUploading(true);
    try {
      const uploaded = [];
      for (const file of files) {
        // eslint-disable-next-line no-await-in-loop
        const url = await uploadFile(file);
        uploaded.push(url);
      }
      onChange([...images, ...uploaded]);
    } catch (error) {
      setErr(getErrorMessage(error, "One or more image uploads failed. Please try again."));
    } finally {
      setUploading(false);
    }
  };

  const removeAt = (idx) => {
    onChange(images.filter((_, i) => i !== idx));
  };

  return (
    <div>
      <Label className="text-sm font-semibold text-ink">Carousel Images</Label>
      <div className="mt-1.5 flex flex-wrap gap-2">
        {images.map((img, idx) => (
          <div key={`${img}-${idx}`} className="relative h-16 w-16 rounded-lg border border-slate-200 overflow-hidden group">
            <img src={fileUrl(img)} alt="" className="h-full w-full object-cover" />
            <button
              type="button"
              onClick={() => removeAt(idx)}
              className="absolute top-0.5 right-0.5 bg-black/60 text-white rounded-full p-0.5 opacity-80 hover:opacity-100"
              title="Remove image"
            >
              <X className="h-3 w-3" />
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          disabled={uploading}
          className="h-16 w-16 rounded-lg border border-dashed border-slate-300 flex items-center justify-center text-slate-400 hover:border-forest hover:text-forest transition-colors disabled:opacity-50"
        >
          {uploading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Plus className="h-5 w-5" />}
        </button>
        <input ref={inputRef} type="file" accept="image/*" multiple className="hidden" onChange={handleFiles} />
      </div>
      <p className="mt-1 text-xs text-slate-400">Shown as the carousel in the public detail popup.</p>
    </div>
  );
}

function MaterialFormDialog({ open, onOpenChange, initial, types, topics, onSaved }) {
  const [form, setForm] = useState(EMPTY_FORM);
  const [saving, setSaving] = useState(false);
  const [err, setErr] = useState("");
  const [thumbUploading, setThumbUploading] = useState(false);

  useEffect(() => {
    if (open) {
      setForm(
        initial
          ? {
              title: initial.title || "",
              type: initial.type || "",
              topic: initial.topic || "",
              level: initial.level || LEVELS[0],
              minutes: initial.minutes ?? "",
              description: initial.description || "",
              thumbnail: initial.thumbnail || "",
              images: Array.isArray(initial.images) ? initial.images : [],
            }
          : EMPTY_FORM
      );
      setErr("");
    }
  }, [open, initial]);

  const update = (field) => (e) => setForm((f) => ({ ...f, [field]: e.target.value }));

  const submit = async (e) => {
    e.preventDefault();
    if (!form.title.trim() || !form.type || !form.topic) {
      setErr("Title, Type and Topic are required.");
      return;
    }
    setErr("");
    setSaving(true);
    const payload = {
      title: form.title.trim(),
      type: form.type,
      topic: form.topic,
      level: form.level,
      minutes: form.minutes === "" ? 0 : Number(form.minutes),
      description: form.description,
      thumbnail: form.thumbnail,
      images: form.images,
    };
    try {
      if (initial) {
        await api.put(`/materials/${initial.id}`, payload);
      } else {
        await api.post("/materials", payload);
      }
      onSaved();
      onOpenChange(false);
    } catch (error) {
      setErr(getErrorMessage(error, "Couldn't save this material. Please try again."));
    } finally {
      setSaving(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{initial ? "Edit Material" : "Add Material"}</DialogTitle>
        </DialogHeader>

        <form onSubmit={submit} className="space-y-4">
          <div>
            <Label className="text-sm font-semibold text-ink">Title</Label>
            <Input value={form.title} onChange={update("title")} className="mt-1.5" required />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <Label className="text-sm font-semibold text-ink">Type</Label>
              <Select value={form.type} onValueChange={(v) => setForm((f) => ({ ...f, type: v }))}>
                <SelectTrigger className="mt-1.5">
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  {types.map((t) => (
                    <SelectItem key={t.id} value={t.name}>
                      {t.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label className="text-sm font-semibold text-ink">Topic</Label>
              <Select value={form.topic} onValueChange={(v) => setForm((f) => ({ ...f, topic: v }))}>
                <SelectTrigger className="mt-1.5">
                  <SelectValue placeholder="Select topic" />
                </SelectTrigger>
                <SelectContent>
                  {topics.map((t) => (
                    <SelectItem key={t.id} value={t.name}>
                      {t.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <Label className="text-sm font-semibold text-ink">Level</Label>
              <Select value={form.level} onValueChange={(v) => setForm((f) => ({ ...f, level: v }))}>
                <SelectTrigger className="mt-1.5">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {LEVELS.map((l) => (
                    <SelectItem key={l} value={l}>
                      {l}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label className="text-sm font-semibold text-ink">Duration (minutes)</Label>
              <Input
                type="number"
                min="0"
                value={form.minutes}
                onChange={update("minutes")}
                className="mt-1.5"
              />
            </div>
          </div>

          <div>
            <Label className="text-sm font-semibold text-ink">Description</Label>
            <Textarea
              value={form.description}
              onChange={update("description")}
              className="mt-1.5"
              rows={4}
              placeholder="Longer description shown in the public detail popup."
            />
          </div>

          <ImageUploadField
            label="Thumbnail"
            url={form.thumbnail}
            onChange={(url) => setForm((f) => ({ ...f, thumbnail: url }))}
            uploading={thumbUploading}
            setUploading={setThumbUploading}
            setErr={setErr}
          />

          <CarouselImagesField
            images={form.images}
            onChange={(images) => setForm((f) => ({ ...f, images }))}
            setErr={setErr}
          />

          {err && <ErrorBanner message={err} />}

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={saving} className="bg-forest hover:bg-forest-dark text-white">
              {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : initial ? "Save changes" : "Add material"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default function Materials() {
  const [materials, setMaterials] = useState([]);
  const [types, setTypes] = useState([]);
  const [topics, setTopics] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [categoriesOpen, setCategoriesOpen] = useState(false);
  const [formOpen, setFormOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [deletingId, setDeletingId] = useState(null);

  const typeByName = useMemo(() => Object.fromEntries(types.map((t) => [t.name, t])), [types]);
  const topicByName = useMemo(() => Object.fromEntries(topics.map((t) => [t.name, t])), [topics]);

  const loadAll = useCallback(async () => {
    setError("");
    try {
      const [mRes, tRes, pRes] = await Promise.all([
        api.get("/materials"),
        api.get("/materials/taxonomy/types"),
        api.get("/materials/taxonomy/topics"),
      ]);
      setMaterials(mRes.data || []);
      setTypes(tRes.data || []);
      setTopics(pRes.data || []);
    } catch (err) {
      setError(getErrorMessage(err, "Couldn't load materials. Please refresh to try again."));
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadAll();
  }, [loadAll]);

  const addType = async (data) => {
    await api.post("/materials/taxonomy/types", data);
    await loadAll();
  };
  const deleteType = async (item) => {
    await api.delete(`/materials/taxonomy/types/${item.id}`);
    await loadAll();
  };
  const addTopic = async (data) => {
    await api.post("/materials/taxonomy/topics", data);
    await loadAll();
  };
  const deleteTopic = async (item) => {
    await api.delete(`/materials/taxonomy/topics/${item.id}`);
    await loadAll();
  };

  const openAdd = () => {
    setEditing(null);
    setFormOpen(true);
  };
  const openEdit = (material) => {
    setEditing(material);
    setFormOpen(true);
  };

  const handleDelete = async (material) => {
    if (!window.confirm(`Delete "${material.title}"? This can't be undone.`)) return;
    setError("");
    setDeletingId(material.id);
    try {
      await api.delete(`/materials/${material.id}`);
      await loadAll();
    } catch (err) {
      setError(getErrorMessage(err, "Couldn't delete this material. Please try again."));
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div>
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h1 className="font-display text-2xl font-extrabold text-ink">Learning Materials</h1>
          <p className="mt-1 text-sm text-body">Courses shown on the public Learning Materials page.</p>
        </div>
        <Button onClick={openAdd} className="bg-forest hover:bg-forest-dark text-white">
          <Plus className="h-4 w-4" />
          Add Material
        </Button>
      </div>

      {error && <ErrorBanner message={error} className="mt-4" />}

      <div className="mt-6 rounded-2xl border border-slate-200 bg-white overflow-hidden">
        <button
          type="button"
          onClick={() => setCategoriesOpen((v) => !v)}
          className="w-full flex items-center justify-between px-5 py-4 text-left"
        >
          <div>
            <h2 className="text-sm font-bold text-ink">Categories (Types & Topics)</h2>
            <p className="text-xs text-slate-400 mt-0.5">
              These choices populate the dropdowns below and the public site's filters.
            </p>
          </div>
          {categoriesOpen ? <ChevronUp className="h-4 w-4 text-slate-400" /> : <ChevronDown className="h-4 w-4 text-slate-400" />}
        </button>
        {categoriesOpen && (
          <div className="px-5 pb-5 pt-1 grid gap-6 sm:grid-cols-2 border-t border-slate-100">
            <TaxonomyGroup title="Material Types" items={types} onAdd={addType} onDelete={deleteType} />
            <TaxonomyGroup title="Topics" items={topics} onAdd={addTopic} onDelete={deleteTopic} />
          </div>
        )}
      </div>

      <div className="mt-6 rounded-2xl border border-slate-200 bg-white overflow-hidden">
        {loading ? (
          <Spinner />
        ) : materials.length === 0 ? (
          <EmptyState className="m-5">No materials yet. Add your first one above.</EmptyState>
        ) : (
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Title</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Topic</TableHead>
                  <TableHead>Level</TableHead>
                  <TableHead>Minutes</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {materials.map((m) => {
                  const typeInfo = typeByName[m.type];
                  const topicInfo = topicByName[m.topic];
                  return (
                    <TableRow key={m.id}>
                      <TableCell className="align-top">
                        <div className="font-semibold text-ink">{m.title}</div>
                        <AuditNote item={m} className="mt-1" />
                      </TableCell>
                      <TableCell className="align-top">
                        <span
                          className="inline-flex px-2 py-0.5 rounded-md text-xs font-semibold"
                          style={{
                            backgroundColor: typeInfo?.color || "#e5e7eb",
                            color: getReadableTextColor(typeInfo?.color),
                          }}
                        >
                          {m.type}
                        </span>
                      </TableCell>
                      <TableCell className="align-top">
                        <span
                          className="inline-flex px-2 py-0.5 rounded-md text-xs font-semibold"
                          style={{
                            backgroundColor: topicInfo?.color || "#e5e7eb",
                            color: getReadableTextColor(topicInfo?.color),
                          }}
                        >
                          {m.topic}
                        </span>
                      </TableCell>
                      <TableCell className="align-top text-sm text-body">{m.level}</TableCell>
                      <TableCell className="align-top text-sm text-body">{m.minutes}</TableCell>
                      <TableCell className="align-top text-right">
                        <div className="flex justify-end gap-1.5">
                          <Button variant="outline" size="sm" onClick={() => openEdit(m)}>
                            <Pencil className="h-3.5 w-3.5" />
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleDelete(m)}
                            disabled={deletingId === m.id}
                            className="text-red-600 hover:text-red-700 hover:bg-red-50"
                          >
                            {deletingId === m.id ? (
                              <Loader2 className="h-3.5 w-3.5 animate-spin" />
                            ) : (
                              <Trash2 className="h-3.5 w-3.5" />
                            )}
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>
        )}
      </div>

      <MaterialFormDialog
        open={formOpen}
        onOpenChange={setFormOpen}
        initial={editing}
        types={types}
        topics={topics}
        onSaved={loadAll}
      />
    </div>
  );
}
