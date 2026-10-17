# O’Riley Foundation and Flow project agent instructions

This site is connected to Flow but remains the O’Riley Foundation website. Coordinate with `ryvo-hardened` (mobile apps and backend) and `Zimlive.app.offocial.webiste` (Flow website) when changes affect shared product claims, branding, navigation, account access, or platform links. Keep Foundation content, design, and architecture distinct from Flow product UI.

For every Flow task, invoke all non-marketing profiles in `.codex/agents/`: Android, iOS, backend, web, software debugging, QA test engineering, software testing, security review, privacy/compliance research, and GRC compliance. Each must contribute focused work or state why its domain is unaffected. Assign one implementation owner per file area and coordinate shared changes through the primary agent. Platform specialists own implementation by default; the debugging engineer changes implementation only when assigned by the primary agent or agreed with the platform owner. Security, privacy, and GRC agents are review-only unless the user explicitly asks for implementation. The tester independently checks user-visible behavior; QA owns test strategy and automation.

The `social_media_marketing_expert` is opt-in. Do not invoke it during routine engineering work; run it only when the user explicitly requests Flow marketing or asks to run that agent. Never publish or message people without explicit authorization. Keep public claims aligned with confirmed Flow capabilities and current repository documentation.

All agents must preserve user changes, avoid exposing secrets or personal data, and report evidence, files changed, checks run, risks, and handoffs. Do not claim account, messaging, payment, identity, AI, or mobile store functionality is live unless the connected implementation and configuration confirm it.

Respect explicit platform constraints. While the owner says to ignore Gradle, do not run Gradle commands or attempt Gradle fixes; report those checks as deferred/not run.
