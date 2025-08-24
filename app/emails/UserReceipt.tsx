import * as React from 'react';
import { Html, Head, Preview, Body, Container, Section, Text, Link, Hr } from '@react-email/components';

export default function UserReceipt(props: {
    firstName: string;
    lastName: string;
    email: string;
    message: string;
}) {
    const { firstName, message } = props;

    return (
        <Html>
            <Head />
            <Preview>Thanks {firstName}! Your message has been received.</Preview>
            <Body style={{ backgroundColor: '#f0fdf4', fontFamily: 'ui-sans-serif, system-ui' }}>
                <Container style={{ maxWidth: 600, margin: '0 auto', padding: 20 }}>
                    <Section style={{ background: 'linear-gradient(135deg,#10b981,#059669)', padding: '24px 18px', borderRadius: '12px 12px 0 0', textAlign: 'center' }}>
                        <Text style={{ color: '#fff', fontSize: 24, fontWeight: 700, margin: 0 }}>👋 Thanks {firstName}!</Text>
                        <Text style={{ color: 'rgba(255,255,255,.9)', marginTop: 8 }}>Your message has been received</Text>
                    </Section>

                    <Section style={{ background: '#fff', padding: 24, borderRadius: '0 0 12px 12px', boxShadow: '0 4px 6px rgba(0,0,0,.05)' }}>
                        <Section style={{ textAlign: 'center', marginBottom: 16 }}>
                            <Text style={{ fontSize: 20, fontWeight: 600, color: '#0f172a' }}>Message Received Successfully!</Text>
                            <Text style={{ color: '#64748b' }}>
                                Thank you for reaching out through my portfolio. I’ll get back to you as soon as possible.
                            </Text>
                        </Section>

                        <Section style={{ background: '#ecfdf5', padding: 16, borderRadius: 8, borderLeft: '4px solid #10b981', textAlign: 'center' }}>
                            <Text style={{ margin: 0, color: '#065f46', fontWeight: 600 }}>
                                ⏱️ <strong>Expected Response Time:</strong> 24–48 hours (business days)
                            </Text>
                        </Section>

                        <Section style={{ background: '#f8fafc', padding: 16, borderRadius: 8, marginTop: 16 }}>
                            <Text style={{ color: '#0f172a', fontWeight: 600, marginBottom: 8 }}>Your message summary:</Text>
                            <Text style={{ color: '#64748b', whiteSpace: 'pre-wrap' }}>
                                {message.length > 150 ? `${message.slice(0, 150)}…` : message}
                            </Text>
                        </Section>

                        <Section style={{ textAlign: 'center', marginTop: 16 }}>
                            <Text style={{ color: '#64748b', marginBottom: 8 }}>Meanwhile, feel free to explore:</Text>
                            <Link href="https://portfolio-using-nextjs15.vercel.app/" style={{ background: '#667eea', color: '#fff', padding: '10px 16px', borderRadius: 6, textDecoration: 'none', fontWeight: 600, marginRight: 8 }}>🌐 Portfolio</Link>
                            <Link href="https://www.linkedin.com/in/gemuel-sampayan-096711288/" style={{ background: '#0077b5', color: '#fff', padding: '10px 16px', borderRadius: 6, textDecoration: 'none', fontWeight: 600, marginRight: 8 }}>💼 LinkedIn</Link>
                            <Link href="https://github.com/Mgtsampayan" style={{ background: '#24292e', color: '#fff', padding: '10px 16px', borderRadius: 6, textDecoration: 'none', fontWeight: 600 }}>🐙 GitHub</Link>
                        </Section>

                        <Hr />
                        <Section>
                            <Text style={{ margin: 0, color: '#10b981', fontSize: 18, fontWeight: 700 }}>Gemuel Sampayan</Text>
                            <Text style={{ margin: 0, color: '#64748b' }}>Full Stack Developer • Next.js Specialist</Text>
                        </Section>
                    </Section>

                    <Section style={{ textAlign: 'center', color: '#64748b', fontSize: 12, marginTop: 12 }}>
                        <Text>This is an automated response. Please do not reply to this email.</Text>
                        <Text>If urgent, contact me directly at gemuel20sampayan@gmail.com</Text>
                    </Section>
                </Container>
            </Body>
        </Html>
    );
}
