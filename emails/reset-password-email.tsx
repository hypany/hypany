import {
  Body,
  Container,
  Head,
  Html,
  Link,
  Preview,
  Text,
} from '@react-email/components'

interface ResetPasswordEmailProps {
  resetUrl: string
  userEmail: string
}

export const ResetPasswordEmail = ({
  resetUrl,
  userEmail,
}: ResetPasswordEmailProps) => {
  return (
    <Html>
      <Head />
      <Preview>Reset your Hypany password</Preview>
      <Body style={main}>
        <Container style={container}>
          <Text style={text}>Hi there,</Text>

          <Text style={text}>
            We received a request to reset the password for your Hypany account
            ({userEmail}).
          </Text>

          <Text style={text}>Click the link below to reset your password:</Text>

          <Link href={resetUrl} style={link}>
            Reset password →
          </Link>

          <Text style={smallText}>
            Or copy and paste this URL into your browser:
            <br />
            <span style={mono}>{resetUrl}</span>
          </Text>

          <Text style={text}>This link will expire in 1 hour.</Text>

          <Text style={separator}>—</Text>

          <Text style={footer}>
            If you didn't request a password reset, you can safely ignore this
            email. Your password won't be changed.
          </Text>
        </Container>
      </Body>
    </Html>
  )
}

export default ResetPasswordEmail

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
