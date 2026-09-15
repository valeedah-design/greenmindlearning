import { useCallback, useEffect, useRef, useState } from "react";
import { Plus, Pencil, Trash2, Loader2, Upload, ImagePlus } from "lucide-react";
import api, { fileUrl, uploadFile, getErrorMessage } from "../api";
import { ErrorBanner, Spinner, EmptyState } from "../components/Feedback";
import AuditNote from "../components/AuditNote";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";

const EMPTY_FORM = { company_name: "", image: "" };

function LogoFormDialog({ open, onOpenChange, initial, onSaved }) {
  const [form, setForm] = useState(EMPTY_FORM);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [err, setErr] = useState("");
  const inputRef = useRef(null);

  useEffect(() => {
    if (open) {
      setForm(
        initial ? { company_name: initial.company_name || "", image: initial.image || "" } : EMPTY_FORM
      );
      setErr("");
    }
  }, [open, initial]);

  const handleFile = async (e) => {
    const file = e.target.files?.[0];
    e.target.value = "";
    if (!file) return;
    setErr("");
    setUploading(true);
    try {
      const url = await uploadFile(file);
      setForm((f) => ({ ...f, image: url }));
    } catch (error) {
      setErr(getErrorMessage(error, "Image upload failed. Please try again."));
    } finally {
      setUploading(false);
    }
  };

  const submit = async (e) => {
    e.preventDefault();
    if (!form.company_name.trim() || !form.image) {
      setErr("Company name and a logo image are required.");
      return;
    }
    setErr("");
    setSaving(true);
    try {
      if (initial) {
        await api.put(`/trusted-by/${initial.id}`, form);
      } else {
        await api.post("/trusted-by", form);
      }
      onSaved();
      onOpenChange(false);
    } catch (error) {
      setErr(getErrorMessage(error, "Couldn't save this logo. Please try again."));
    } finally {
      setSaving(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>{initial ? "Edit Logo" : "Add Logo"}</DialogTitle>
        </DialogHeader>
        <form onSubmit={submit} className="space-y-4">
          <div>
            <Label className="text-sm font-semibold text-ink">Company Name</Label>
            <Input
              value={form.company_name}
              onChange={(e) => setForm((f) => ({ ...f, company_name: e.target.value }))}
              className="mt-1.5"
              required
            />
          </div>

          <div>
            <Label className="text-sm font-semibold text-ink">Logo</Label>
            <div className="mt-1.5 flex items-center gap-3">
              <div className="h-16 w-16 rounded-lg border border-slate-200 bg-slate-50 overflow-hidden flex items-center justify-center shrink-0">
                {form.image ? (
                  <img src={fileUrl(form.image)} alt="" className="h-full w-full object-contain p-1.5" />
                ) : (
                  <ImagePlus className="h-5 w-5 text-slate-300" />
                )}
              </div>
              <Button type="button" variant="outline" size="sm" onClick={() => inputRef.current?.click()} disabled={uploading}>
                {uploading ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Upload className="h-3.5 w-3.5" />}
                {form.image ? "Replace" : "Upload"}
              </Button>
              <input ref={inputRef} type="file" accept="image/*" className="hidden" onChange={handleFile} />
            </div>
          </div>

          {err && <ErrorBanner message={err} />}

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={saving} className="bg-forest hover:bg-forest-dark text-white">
              {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : initial ? "Save changes" : "Add logo"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default function TrustedBy() {
  const [enabled, setEnabled] = useState(false);
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [toggling, setToggling] = useState(false);
  const [formOpen, setFormOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [deletingId, setDeletingId] = useState(null);

  const load = useCallback(async () => {
    setError("");
    try {
      const res = await api.get("/trusted-by");
      setEnabled(!!res.data?.enabled);
      setItems(res.data?.items || []);
    } catch (err) {
      setError(getErrorMessage(err, "Couldn't load logos. Please refresh to try again."));
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const handleToggle = async (next) => {
    setError("");
    setToggling(true);
    const prev = enabled;
    setEnabled(next);
    try {
      await api.put("/trusted-by/toggle", { enabled: next });
    } catch (err) {
      setEnabled(prev);
      setError(getErrorMessage(err, "Couldn't update the toggle. Please try again."));
    } finally {
      setToggling(false);
    }
  };

  const openAdd = () => {
    setEditing(null);
    setFormOpen(true);
  };
  const openEdit = (item) => {
    setEditing(item);
    setFormOpen(true);
  };

  const handleDelete = async (item) => {
    if (!window.confirm(`Delete the "${item.company_name}" logo? This can't be undone.`)) return;
    setError("");
    setDeletingId(item.id);
    try {
      await api.delete(`/trusted-by/${item.id}`);
      await load();
    } catch (err) {
      setError(getErrorMessage(err, "Couldn't delete this logo. Please try again."));
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div>
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h1 className="font-display text-2xl font-extrabold text-ink">Trusted-by Logos</h1>
          <p className="mt-1 text-sm text-body">The client logo strip shown on the public Home page.</p>
        </div>
        <Button onClick={openAdd} className="bg-forest hover:bg-forest-dark text-white">
          <Plus className="h-4 w-4" />
          Add Logo
        </Button>
      </div>

      {error && <ErrorBanner message={error} className="mt-4" />}

      <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-5 flex items-center justify-between gap-4">
        <div>
          <p className="text-sm font-semibold text-ink">Show "Trusted by" logo strip</p>
          <p className="text-xs text-slate-400 mt-0.5">Defaults to OFF because the current entries are placeholders.</p>
        </div>
        <Switch checked={enabled} onCheckedChange={handleToggle} disabled={toggling || loading} />
      </div>

      <div className="mt-6">
        {loading ? (
          <div className="rounded-2xl border border-slate-200 bg-white">
            <Spinner />
          </div>
        ) : items.length === 0 ? (
          <EmptyState>No logos yet. Add your first one above.</EmptyState>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {items.map((item) => (
              <div key={item.id} className="rounded-2xl border border-slate-200 bg-white p-4 flex flex-col items-center text-center">
                <div className="h-16 w-full rounded-lg bg-slate-50 flex items-center justify-center overflow-hidden mb-3">
                  <img src={fileUrl(item.image)} alt={item.company_name} className="max-h-12 max-w-[80%] object-contain" />
                </div>
                <p className="text-sm font-semibold text-ink">{item.company_name}</p>
                <AuditNote item={item} className="mt-1" />
                <div className="flex gap-1.5 mt-3">
                  <Button variant="outline" size="sm" onClick={() => openEdit(item)}>
                    <Pencil className="h-3.5 w-3.5" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleDelete(item)}
                    disabled={deletingId === item.id}
                    className="text-red-600 hover:text-red-700 hover:bg-red-50"
                  >
                    {deletingId === item.id ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Trash2 className="h-3.5 w-3.5" />}
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <LogoFormDialog open={formOpen} onOpenChange={setFormOpen} initial={editing} onSaved={load} />
    </div>
  );
}
