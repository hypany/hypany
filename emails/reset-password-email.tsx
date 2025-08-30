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
        <Container style={containerStyle}>
          <Text style={text}>Hi there,</Text>

          <Text style={text}>
            We received a request to reset the password for your Hypany account
            ({userEmail}).
          </Text>

          <Text style={text}>Click the link below to reset your password:</Text>

          <Link href={resetUrl} style={buttonPrimary}>
            Reset password →
          </Link>

          <Text style={smallText}>
            Or copy and paste this URL into your browser:
            <br />
            <span style={mono}>{resetUrl}</span>
          </Text>

          <Text style={text}>This link will expire in 1 hour.</Text>

          <Text style={separator}>-</Text>

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
