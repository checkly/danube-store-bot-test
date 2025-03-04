import { defineConfig } from 'checkly'
import { Frequency, RetryStrategyBuilder } from 'checkly/constructs'
import { WebhookAlertChannel } from 'checkly/constructs'

export const webhookChannel = new WebhookAlertChannel('srebot-webhook', {
  name: 'srebot-demo-webhook',
  method: 'POST',
  url: new URL('https://srebot-1.onrender.com/checkly-webhook'),
  sendRecovery: true,
  sendFailure: true,
  sendDegraded: false,
  sslExpiry: false,
  template: `{
  "CHECK_NAME": "{{ CHECK_NAME }}",
  "CHECK_ID": "{{ CHECK_ID }}",
  "CHECK_TYPE": "{{ CHECK_TYPE }}",
  "GROUP_NAME": "{{ GROUP_NAME }}",
  "ALERT_TITLE": "{{ ALERT_TITLE }}",
  "ALERT_TYPE": "{{ ALERT_TYPE }}",
  "CHECK_RESULT_ID": "{{ CHECK_RESULT_ID }}",
  "RESPONSE_TIME": "{{ RESPONSE_TIME }}",
  "API_CHECK_RESPONSE_STATUS_CODE": "{{ API_CHECK_RESPONSE_STATUS_CODE }}",
  "API_CHECK_RESPONSE_STATUS_TEXT": "{{ API_CHECK_RESPONSE_STATUS_TEXT }}",
  "RUN_LOCATION": "{{ RUN_LOCATION }}",
  "RESULT_LINK": "{{ RESULT_LINK }}",
  "SSL_DAYS_REMAINING": "{{ SSL_DAYS_REMAINING }}",
  "SSL_CHECK_DOMAIN": "{{ SSL_CHECK_DOMAIN }}",
  "STARTED_AT": "{{ STARTED_AT }}",
  "TAGS": "{{ TAGS }}",
  "$RANDOM_NUMBER": "{{ $RANDOM_NUMBER }}",
  "$UUID": "{{ $UUID }}",
  "moment": "{{ moment }}"
}`,
})

export const webhookChannelLocal = new WebhookAlertChannel('srebot-demo-webhook', {
  name: 'srebot-prod-webhook-local',
  method: 'POST',
  url: new URL('https://8159-87-206-18-21.ngrok-free.app/checkly-webhook'),
  sendRecovery: true,
  sendFailure: true,
  sendDegraded: false,
  sslExpiry: false,
  template: `{
  "CHECK_NAME": "{{ CHECK_NAME }}",
  "CHECK_ID": "{{ CHECK_ID }}",
  "CHECK_TYPE": "{{ CHECK_TYPE }}",
  "GROUP_NAME": "{{ GROUP_NAME }}",
  "ALERT_TITLE": "{{ ALERT_TITLE }}",
  "ALERT_TYPE": "{{ ALERT_TYPE }}",
  "CHECK_RESULT_ID": "{{ CHECK_RESULT_ID }}",
  "RESPONSE_TIME": "{{ RESPONSE_TIME }}",
  "API_CHECK_RESPONSE_STATUS_CODE": "{{ API_CHECK_RESPONSE_STATUS_CODE }}",
  "API_CHECK_RESPONSE_STATUS_TEXT": "{{ API_CHECK_RESPONSE_STATUS_TEXT }}",
  "RUN_LOCATION": "{{ RUN_LOCATION }}",
  "RESULT_LINK": "{{ RESULT_LINK }}",
  "SSL_DAYS_REMAINING": "{{ SSL_DAYS_REMAINING }}",
  "SSL_CHECK_DOMAIN": "{{ SSL_CHECK_DOMAIN }}",
  "STARTED_AT": "{{ STARTED_AT }}",
  "TAGS": "{{ TAGS }}",
  "$RANDOM_NUMBER": "{{ $RANDOM_NUMBER }}",
  "$UUID": "{{ $UUID }}",
  "moment": "{{ moment }}"
}`,
})

export default defineConfig({
 projectName: 'Website Monitoring',
 logicalId: 'website-monitoring-1',
 repoUrl: 'https://github.com/acme/website',
 checks: {
  alertChannels: [
    webhookChannel,
    webhookChannelLocal,
  ],
   activated: true,
   muted: false,
   runtimeId: '2022.10',
   frequency: Frequency.EVERY_5M,
   locations: ['us-east-1', 'eu-west-1'],
   tags: ['website', 'api', 'srebot'],
   checkMatch: '**/__checks__/**/*.check.ts',
   ignoreDirectoriesMatch: [],
   browserChecks: {
     frequency: Frequency.EVERY_10M,
     testMatch: '**/__checks__/**/*.spec.ts',
     retryStrategy: RetryStrategyBuilder.noRetries(),
   },
 },
 cli: {
   runLocation: 'eu-west-1',
 }
})
