"use client";

import { useState } from "react";
import { z } from "zod";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Loader2, MailCheck } from "lucide-react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogFooter,
} from "@/components/ui/dialog";
import { motion, AnimatePresence } from "framer-motion";

const ContactFormSchema = z.object({
    firstName: z.string().min(1, "First name is required"),
    lastName: z.string().min(1, "Last name is required"),
    email: z.string().email("Invalid email"),
    message: z.string().min(10, "Message too short"),
    website: z.string().optional(), // honeypot
});

export default function Contact1() {
    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);
    const { toast } = useToast();

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setLoading(true);

        const form = e.currentTarget;
        const formData = Object.fromEntries(new FormData(form)) as Record<string, string>;

        const parsed = ContactFormSchema.safeParse(formData);
        if (!parsed.success) {
            setLoading(false);
            toast({
                variant: "destructive",
                title: "⚠️ Validation failed",
                description: "Please check your input fields.",
            });
            return;
        }

        const res = await fetch("/api/contact", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(parsed.data),
        });

        setLoading(false);

        if (res.status === 429) {
            toast({
                variant: "destructive",
                title: "⏱️ Too many requests",
                description: "Please wait a bit before trying again.",
            });
            return;
        }

        if (res.ok) {
            form.reset();
            setOpen(true);
        } else {
            const data = await res.json();
            toast({
                variant: "destructive",
                title: "❌ Failed to send",
                description: data.message || "Something went wrong. Try again later.",
            });
        }
    }

    return (
        <>
            {/* Form container themed with shadcn/ui tokens */}
            <motion.form
                onSubmit={handleSubmit}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="space-y-4 max-w-lg mx-auto p-6 rounded-lg shadow-sm bg-card text-card-foreground border"
            >
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
                    <Input type="text" name="firstName" placeholder="First Name" />
                </motion.div>

                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
                    <Input type="text" name="lastName" placeholder="Last Name" />
                </motion.div>

                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
                    <Input type="email" name="email" placeholder="Email" />
                </motion.div>

                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
                    <Textarea name="message" placeholder="Your message..." rows={5} />
                </motion.div>

                {/* Honeypot hidden field */}
                <input type="text" name="website" tabIndex={-1} autoComplete="off" className="hidden" />

                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
                    <Button
                        type="submit"
                        disabled={loading}
                        className="w-full flex items-center justify-center"
                    >
                        {loading ? (
                            <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Sending...
                            </>
                        ) : (
                            "Send Message"
                        )}
                    </Button>
                </motion.div>
            </motion.form>

            {/* Success Dialog */}
            <AnimatePresence>
                {open && (
                    <Dialog open={open} onOpenChange={setOpen}>
                        <DialogContent asChild>
                            <motion.div
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                transition={{ duration: 0.25, ease: "easeOut" }}
                            >
                                <DialogHeader>
                                    <DialogTitle className="flex items-center gap-2">
                                        <MailCheck className="h-5 w-5 text-green-600" />
                                        Message Sent!
                                    </DialogTitle>
                                    <DialogDescription>
                                        ✅ Thank you for reaching out! I’ll reply within 24–48 hours.
                                    </DialogDescription>
                                </DialogHeader>
                                <DialogFooter>
                                    <Button onClick={() => setOpen(false)}>Close</Button>
                                </DialogFooter>
                            </motion.div>
                        </DialogContent>
                    </Dialog>
                )}
            </AnimatePresence>
        </>
    );
}
