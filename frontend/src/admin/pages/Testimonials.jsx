import { useCallback, useEffect, useState } from "react";
import { Plus, Pencil, Trash2, Loader2 } from "lucide-react";
import api, { getErrorMessage } from "../api";
import { ErrorBanner, Spinner, EmptyState } from "../components/Feedback";
import AuditNote from "../components/AuditNote";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";

const EMPTY_FORM = { name: "", role: "", quote: "", linkedin_url: "" };

function TestimonialFormDialog({ open, onOpenChange, initial, onSaved }) {
  const [form, setForm] = useState(EMPTY_FORM);
  const [saving, setSaving] = useState(false);
  const [err, setErr] = useState("");

  useEffect(() => {
    if (open) {
      setForm(
        initial
          ? {
              name: initial.name || "",
              role: initial.role || "",
              quote: initial.quote || "",
              linkedin_url: initial.linkedin_url || "",
            }
          : EMPTY_FORM
      );
      setErr("");
    }
  }, [open, initial]);

  const update = (field) => (e) => setForm((f) => ({ ...f, [field]: e.target.value }));

  const submit = async (e) => {
    e.preventDefault();
    if (!form.name.trim() || !form.quote.trim()) {
      setErr("Name and Quote are required.");
      return;
    }
    setErr("");
    setSaving(true);
    try {
      if (initial) {
        await api.put(`/testimonials/${initial.id}`, form);
      } else {
        await api.post("/testimonials", form);
      }
      onSaved();
      onOpenChange(false);
    } catch (error) {
      setErr(getErrorMessage(error, "Couldn't save this testimonial. Please try again."));
    } finally {
      setSaving(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{initial ? "Edit Testimonial" : "Add Testimonial"}</DialogTitle>
        </DialogHeader>
        <form onSubmit={submit} className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <Label className="text-sm font-semibold text-ink">Name</Label>
              <Input value={form.name} onChange={update("name")} className="mt-1.5" required />
            </div>
            <div>
              <Label className="text-sm font-semibold text-ink">Role / Company</Label>
              <Input value={form.role} onChange={update("role")} className="mt-1.5" />
            </div>
          </div>
          <div>
            <Label className="text-sm font-semibold text-ink">Quote</Label>
            <Textarea value={form.quote} onChange={update("quote")} className="mt-1.5" rows={4} required />
          </div>
          <div>
            <Label className="text-sm font-semibold text-ink">LinkedIn URL</Label>
            <Input
              type="url"
              value={form.linkedin_url}
              onChange={update("linkedin_url")}
              className="mt-1.5"
              placeholder="https://linkedin.com/in/…"
            />
          </div>

          {err && <ErrorBanner message={err} />}

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={saving} className="bg-forest hover:bg-forest-dark text-white">
              {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : initial ? "Save changes" : "Add testimonial"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default function Testimonials() {
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
      const res = await api.get("/testimonials");
      setEnabled(!!res.data?.enabled);
      setItems(res.data?.items || []);
    } catch (err) {
      setError(getErrorMessage(err, "Couldn't load testimonials. Please refresh to try again."));
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
      await api.put("/testimonials/toggle", { enabled: next });
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
    if (!window.confirm(`Delete the testimonial from "${item.name}"? This can't be undone.`)) return;
    setError("");
    setDeletingId(item.id);
    try {
      await api.delete(`/testimonials/${item.id}`);
      await load();
    } catch (err) {
      setError(getErrorMessage(err, "Couldn't delete this testimonial. Please try again."));
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div>
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h1 className="font-display text-2xl font-extrabold text-ink">Testimonials</h1>
          <p className="mt-1 text-sm text-body">Shown on the public For Trainers page.</p>
        </div>
        <Button onClick={openAdd} className="bg-forest hover:bg-forest-dark text-white">
          <Plus className="h-4 w-4" />
          Add Testimonial
        </Button>
      </div>

      {error && <ErrorBanner message={error} className="mt-4" />}

      <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-5 flex items-center justify-between gap-4">
        <div>
          <p className="text-sm font-semibold text-ink">Show testimonials on the For Trainers page</p>
          <p className="text-xs text-slate-400 mt-0.5">Currently defaults to off until real testimonials are added.</p>
        </div>
        <Switch checked={enabled} onCheckedChange={handleToggle} disabled={toggling || loading} />
      </div>

      <div className="mt-6 space-y-3">
        {loading ? (
          <div className="rounded-2xl border border-slate-200 bg-white">
            <Spinner />
          </div>
        ) : items.length === 0 ? (
          <EmptyState>No testimonials yet. Add your first one above.</EmptyState>
        ) : (
          items.map((item) => (
            <div key={item.id} className="rounded-2xl border border-slate-200 bg-white p-5">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div className="min-w-0">
                  <h3 className="font-semibold text-ink">
                    {item.name}
                    {item.role && <span className="text-body font-normal"> — {item.role}</span>}
                  </h3>
                  <p className="mt-1.5 text-sm text-body italic">&ldquo;{item.quote}&rdquo;</p>
                  {item.linkedin_url && (
                    <a
                      href={item.linkedin_url}
                      target="_blank"
                      rel="noreferrer"
                      className="mt-2 inline-block text-xs font-semibold text-forest hover:text-forest-dark"
                    >
                      {item.linkedin_url}
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

      <TestimonialFormDialog open={formOpen} onOpenChange={setFormOpen} initial={editing} onSaved={load} />
    </div>
  );
}
