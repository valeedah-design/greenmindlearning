import { useCallback, useEffect, useState } from "react";
import { Plus, Pencil, Trash2, Loader2, ExternalLink } from "lucide-react";
import api, { getErrorMessage } from "../api";
import { ErrorBanner, Spinner, EmptyState } from "../components/Feedback";
import AuditNote from "../components/AuditNote";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";

const EMPTY_FORM = { title: "", description: "", url: "", category: "", date: "" };

function InsightFormDialog({ open, onOpenChange, initial, onSaved }) {
  const [form, setForm] = useState(EMPTY_FORM);
  const [saving, setSaving] = useState(false);
  const [err, setErr] = useState("");

  useEffect(() => {
    if (open) {
      setForm(
        initial
          ? {
              title: initial.title || "",
              description: initial.description || "",
              url: initial.url || "",
              category: initial.category || "",
              date: initial.date || "",
            }
          : EMPTY_FORM
      );
      setErr("");
    }
  }, [open, initial]);

  const update = (field) => (e) => setForm((f) => ({ ...f, [field]: e.target.value }));

  const submit = async (e) => {
    e.preventDefault();
    if (!form.title.trim() || !form.url.trim()) {
      setErr("Title and URL are required.");
      return;
    }
    setErr("");
    setSaving(true);
    try {
      if (initial) {
        await api.put(`/insights/${initial.id}`, form);
      } else {
        await api.post("/insights", form);
      }
      onSaved();
      onOpenChange(false);
    } catch (error) {
      setErr(getErrorMessage(error, "Couldn't save this insight. Please try again."));
    } finally {
      setSaving(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{initial ? "Edit Insight" : "Add Insight"}</DialogTitle>
        </DialogHeader>
        <form onSubmit={submit} className="space-y-4">
          <div>
            <Label className="text-sm font-semibold text-ink">Title</Label>
            <Input value={form.title} onChange={update("title")} className="mt-1.5" required />
          </div>
          <div>
            <Label className="text-sm font-semibold text-ink">Description</Label>
            <Textarea value={form.description} onChange={update("description")} className="mt-1.5" rows={3} />
          </div>
          <div>
            <Label className="text-sm font-semibold text-ink">URL</Label>
            <Input
              type="url"
              value={form.url}
              onChange={update("url")}
              className="mt-1.5"
              placeholder="https://…"
              required
            />
            <p className="mt-1 text-xs text-slate-400">The external link to the actual news/insight.</p>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <Label className="text-sm font-semibold text-ink">Category</Label>
              <Input value={form.category} onChange={update("category")} className="mt-1.5" />
            </div>
            <div>
              <Label className="text-sm font-semibold text-ink">Date</Label>
              <Input value={form.date} onChange={update("date")} className="mt-1.5" placeholder="e.g. Aug 15, 2026" />
            </div>
          </div>

          {err && <ErrorBanner message={err} />}

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={saving} className="bg-forest hover:bg-forest-dark text-white">
              {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : initial ? "Save changes" : "Add insight"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default function Insights() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [formOpen, setFormOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [deletingId, setDeletingId] = useState(null);

  const load = useCallback(async () => {
    setError("");
    try {
      const res = await api.get("/insights");
      setItems(res.data || []);
    } catch (err) {
      setError(getErrorMessage(err, "Couldn't load insights. Please refresh to try again."));
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const openAdd = () => {
    setEditing(null);
    setFormOpen(true);
  };
  const openEdit = (item) => {
    setEditing(item);
    setFormOpen(true);
  };

  const handleDelete = async (item) => {
    if (!window.confirm(`Delete "${item.title}"? This can't be undone.`)) return;
    setError("");
    setDeletingId(item.id);
    try {
      await api.delete(`/insights/${item.id}`);
      await load();
    } catch (err) {
      setError(getErrorMessage(err, "Couldn't delete this insight. Please try again."));
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div>
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h1 className="font-display text-2xl font-extrabold text-ink">Industry Insights</h1>
          <p className="mt-1 text-sm text-body">Shown on the public Resources Hub page.</p>
        </div>
        <Button onClick={openAdd} className="bg-forest hover:bg-forest-dark text-white">
          <Plus className="h-4 w-4" />
          Add Insight
        </Button>
      </div>

      {error && <ErrorBanner message={error} className="mt-4" />}

      <div className="mt-6 space-y-3">
        {loading ? (
          <div className="rounded-2xl border border-slate-200 bg-white">
            <Spinner />
          </div>
        ) : items.length === 0 ? (
          <EmptyState>No insights yet. Add your first one above.</EmptyState>
        ) : (
          items.map((item) => (
            <div key={item.id} className="rounded-2xl border border-slate-200 bg-white p-5">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div className="min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h3 className="font-semibold text-ink">{item.title}</h3>
                    {item.category && (
                      <span className="text-[11px] font-bold uppercase tracking-wide text-forest bg-forest-light px-2 py-0.5 rounded-full">
                        {item.category}
                      </span>
                    )}
                    {item.date && <span className="text-xs text-slate-400">{item.date}</span>}
                  </div>
                  {item.description && <p className="mt-1.5 text-sm text-body">{item.description}</p>}
                  {item.url && (
                    <a
                      href={item.url}
                      target="_blank"
                      rel="noreferrer"
                      className="mt-2 inline-flex items-center gap-1 text-xs font-semibold text-forest hover:text-forest-dark"
                    >
                      {item.url}
                      <ExternalLink className="h-3 w-3" />
                    </a>
                  )}
                  <AuditNote item={item} className="mt-2" />
                </div>
                <div className="flex gap-1.5 shrink-0">
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
            </div>
          ))
        )}
      </div>

      <InsightFormDialog open={formOpen} onOpenChange={setFormOpen} initial={editing} onSaved={load} />
    </div>
  );
}
