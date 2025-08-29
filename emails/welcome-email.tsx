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
  colors,
  container as containerStyle,
  footer,
  main,
  separator,
  text,
} from './styles'

interface WelcomeEmailProps {
  userEmail: string
}

export const WelcomeEmail = ({ userEmail }: WelcomeEmailProps) => {
  return (
    <Html>
      <Head />
      <Preview>Welcome to Hypany</Preview>
      <Body style={main}>
        <Container style={containerStyle}>
          <Text style={text}>Hi {userEmail},</Text>
          <Text style={text}>
            Thanks for joining the waitlist! We’ll keep you posted with updates
            and early access invites.
          </Text>
          <Text style={text}>Here are a few things you can do next:</Text>
          <ul>
            <li>
              <Link
                href='https://www.hypany.com'
                style={{ color: colors.brand }}
              >
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
