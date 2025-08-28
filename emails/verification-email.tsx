import {
  Body,
  Container,
  Head,
  Html,
  Link,
  Preview,
  Text,
} from '@react-email/components'

interface VerificationEmailProps {
  verificationUrl: string
  userEmail: string
}

export const VerificationEmail = ({
  verificationUrl,
}: VerificationEmailProps) => {
  return (
    <Html>
      <Head />
      <Preview>Verify your email address for Hypany</Preview>
      <Body style={main}>
        <Container style={container}>
          <Text style={text}>Hi there,</Text>

          <Text style={text}>
            Welcome to Hypany! Please verify your email address by clicking the
            link below:
          </Text>

          <Link href={verificationUrl} style={link}>
            Verify email address →
          </Link>

          <Text style={smallText}>
            Or copy and paste this URL into your browser:
            <br />
            <span style={mono}>{verificationUrl}</span>
          </Text>

          <Text style={text}>This link will expire in 1 hour.</Text>

          <Text style={separator}>—</Text>

          <Text style={footer}>
            If you didn't create an account with Hypany, you can safely ignore
            this email.
          </Text>
        </Container>
      </Body>
    </Html>
  )
}

export default VerificationEmail

const main = {
  backgroundColor: '#ffffff',
  fontFamily:
    '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
}

const container = {
  margin: '0 auto',
  maxWidth: '560px',
  padding: '40px 20px',
}

const text = {
  color: '#1a1a1a',
  fontSize: '15px',
  lineHeight: '24px',
  margin: '0 0 16px',
}

const smallText = {
  color: '#666666',
  fontSize: '13px',
  lineHeight: '20px',
  margin: '24px 0 16px',
}

const link = {
  color: '#0969da',
  display: 'inline-block',
  fontSize: '15px',
  lineHeight: '24px',
  margin: '16px 0',
  textDecoration: 'none',
}

const mono = {
  color: '#666666',
  fontFamily: 'monospace',
  fontSize: '12px',
  wordBreak: 'break-all' as const,
}

const separator = {
  color: '#e1e4e8',
  fontSize: '15px',
  lineHeight: '24px',
  margin: '24px 0 16px',
}

const footer = {
  color: '#666666',
  fontSize: '13px',
  lineHeight: '20px',
  margin: '0',
}
