import * as React from 'react';
import { Html, Head, Preview, Body, Container, Section, Text, Link, Hr } from '@react-email/components';

export default function AdminNotification(props: {
    firstName: string;
    lastName: string;
    email: string;
    message: string;
    ip: string;
    userAgent: string;
    referer: string;
    timestamp: string;
}) {
    const { firstName, lastName, email, message, ip, userAgent, referer, timestamp } = props;

    return (
        <Html>
            <Head />
            <Preview>New contact from {firstName} {lastName}</Preview>
            <Body style={{ backgroundColor: '#f8fafc', fontFamily: 'ui-sans-serif, system-ui' }}>
                <Container style={{ maxWidth: 600, margin: '0 auto', padding: 20 }}>
                    <Section style={{ background: 'linear-gradient(135deg,#667eea,#764ba2)', padding: '24px 18px', borderRadius: '12px 12px 0 0', textAlign: 'center' }}>
                        <Text style={{ color: '#fff', fontSize: 24, fontWeight: 700, margin: 0 }}>📧 New Contact Submission</Text>
                        <Text style={{ color: 'rgba(255,255,255,.9)', marginTop: 8 }}>From your portfolio website</Text>
                    </Section>

                    <Section style={{ background: '#fff', padding: '24px', borderRadius: '0 0 12px 12px', boxShadow: '0 4px 6px rgba(0,0,0,.05)' }}>
                        <Section style={{ background: '#f8fafc', padding: 16, borderLeft: '4px solid #667eea', borderRadius: 8, marginBottom: 20 }}>
                            <Text style={{ color: '#0f172a', fontSize: 18, fontWeight: 600, margin: 0, marginBottom: 8 }}>Contact Information</Text>
                            <Text><strong>Name:</strong> {firstName} {lastName}</Text>
                            <Text><strong>Email:</strong> <Link href={`mailto:${email}`}>{email}</Link></Text>
                        </Section>

                        <Section style={{ background: '#f1f5f9', padding: 16, borderLeft: '4px solid #10b981', borderRadius: 8, marginBottom: 20 }}>
                            <Text style={{ color: '#0f172a', fontSize: 16, fontWeight: 600, marginBottom: 8 }}>Message</Text>
                            <Text style={{ whiteSpace: 'pre-wrap', color: '#334155' }}>{message}</Text>
                        </Section>

                        <Section style={{ textAlign: 'center', marginTop: 8, marginBottom: 8 }}>
                            <Link href={`mailto:${email}?subject=Re: Contact from ${firstName} ${lastName}`} style={{ background: '#667eea', color: '#fff', padding: '10px 18px', borderRadius: 6, textDecoration: 'none', fontWeight: 600, marginRight: 8 }}>📧 Reply</Link>
                            <Link href="https://portfolio-using-nextjs15.vercel.app/" style={{ background: '#64748b', color: '#fff', padding: '10px 18px', borderRadius: 6, textDecoration: 'none', fontWeight: 600 }}>🔗 Portfolio</Link>
                        </Section>

                        <Hr />
                        <Text style={{ color: '#64748b', fontSize: 12, textTransform: 'uppercase', letterSpacing: .3, marginTop: 10, marginBottom: 6 }}>Submission Details</Text>
                        <Text style={{ color: '#64748b', fontSize: 13 }}>📅 Received: {timestamp}</Text>
                        <Text style={{ color: '#64748b', fontSize: 13 }}>🌐 IP: {ip}</Text>
                        <Text style={{ color: '#64748b', fontSize: 13 }}>🔍 UA: {userAgent}</Text>
                        <Text style={{ color: '#64748b', fontSize: 13 }}>📄 Referer: {referer}</Text>
                    </Section>

                    <Section style={{ textAlign: 'center', color: '#64748b', fontSize: 12, marginTop: 12 }}>
                        <Text>This email was automatically generated from your portfolio contact form.</Text>
                    </Section>
                </Container>
            </Body>
        </Html>
    );
}
