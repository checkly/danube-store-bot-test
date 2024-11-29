import { defineConfig } from 'checkly'
import { Frequency } from 'checkly/constructs'
import { WebhookAlertChannel } from 'checkly/constructs'

export const webhookChannel = new WebhookAlertChannel('webhook-239286', {
  name: 'srebot-prod-webhook',
  method: 'POST',
  url: new URL('https://srebot-zys7.onrender.com/checkly-webhook'),
  sendRecovery: false,
  sendFailure: false,
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
  alertChannels: [webhookChannel],
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
   },
 },
 cli: {
   runLocation: 'eu-west-1',
 }
})