import { ChatWidget } from '@papercups-io/chat-widget';
import React from 'react';

export function Chat(): React.ReactElement {
	return (
		<ChatWidget
			token="a656c3d1-7c39-4157-a378-0328d1df0d6c"
			inbox="7646dd04-38ed-4c7b-821e-bc6f5ed46313"
			title="Welcome to Sir Chester"
			subtitle="Ask me anything in the chat window below."
			primaryColor="#0070f3"
			newMessagePlaceholder="Start typing..."
			showAgentAvailability={false}
			agentAvailableText="We're online right now!"
			agentUnavailableText="We're away at the moment."
			requireEmailUpfront={false}
			iconVariant="outlined"
			baseUrl="https://app.papercups.io"
		/>
	);
}
