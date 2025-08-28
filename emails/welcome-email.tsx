import {
  Body,
  Container,
  Head,
  Html,
  Link,
  Preview,
  Text,
} from '@react-email/components'

interface WelcomeEmailProps {
  userEmail: string
}

export const WelcomeEmail = ({ userEmail }: WelcomeEmailProps) => {
  return (
    <Html>
      <Head />
      <Preview>Welcome to Hypany</Preview>
      <Body style={main}>
        <Container style={container}>
          <Text style={text}>Hi {userEmail},</Text>
          <Text style={text}>
            Thanks for joining the waitlist! We’ll keep you posted with updates
            and early access invites.
          </Text>
          <Text style={text}>Here are a few things you can do next:</Text>
          <ul>
            <li>
              <Link href='https://www.hypany.com' style={link}>
                Explore Hypany
              </Link>
            </li>
          </ul>
          <Text style={separator}>—</Text>
          <Text style={footer}>Glad to have you onboard 🚀</Text>
        </Container>
      </Body>
    </Html>
  )
}

export default WelcomeEmail

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

const link = {
  color: '#0969da',
  display: 'inline-block',
  fontSize: '15px',
  lineHeight: '24px',
  margin: '16px 0',
  textDecoration: 'none',
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
