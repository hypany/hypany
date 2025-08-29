import {
  Body,
  Container,
  Head,
  Html,
  Link,
  Preview,
  Text,
} from '@react-email/components'
import {
  buttonPrimary,
  container as containerStyle,
  footer,
  main,
  mono,
  separator,
  smallText,
  text,
} from './styles'

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
        <Container style={containerStyle}>
          <Text style={text}>Hi there,</Text>

          <Text style={text}>
            Welcome to Hypany! Please verify your email address by clicking the
            link below:
          </Text>

          <Link href={verificationUrl} style={buttonPrimary}>
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
