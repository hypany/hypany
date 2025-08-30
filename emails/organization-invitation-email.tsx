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

interface OrganizationInvitationEmailProps {
  invitationLink: string
  organizationName: string
  inviterName?: string
  recipientEmail: string
}

export const OrganizationInvitationEmail = ({
  invitationLink,
  organizationName,
  inviterName,
}: OrganizationInvitationEmailProps) => {
  return (
    <Html>
      <Head />
      <Preview>
        You've been invited to join {organizationName} on Hypany
      </Preview>
      <Body style={main}>
        <Container style={containerStyle}>
          <Text style={text}>Hi there,</Text>

          <Text style={text}>
            {inviterName
              ? `${inviterName} has invited you to join ${organizationName} on Hypany.`
              : `You've been invited to join ${organizationName} on Hypany.`}
          </Text>

          <Text style={text}>
            Accept the invitation to collaborate with your team and access
            shared resources.
          </Text>

          <Link href={invitationLink} style={buttonPrimary}>
            Accept invitation →
          </Link>

          <Text style={smallText}>
            Or copy and paste this URL into your browser:
            <br />
            <span style={mono}>{invitationLink}</span>
          </Text>

          <Text style={text}>This invitation will expire in 7 days.</Text>

          <Text style={separator}>-</Text>

          <Text style={footer}>
            If you don't want to join this organization or didn't expect this
            invitation, you can safely ignore this email.
          </Text>
        </Container>
      </Body>
    </Html>
  )
}

export default OrganizationInvitationEmail
