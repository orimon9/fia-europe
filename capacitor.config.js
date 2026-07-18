/**
 * Capacitor config — wraps the web build into native iOS & Android apps.
 * Use only when building native apps (see README "Native apps" section).
 */
const config = {
  appId: "eu.fiaeuropenetwork.app",
  appName: "FIA Europe Network",
  webDir: "out",
  server: {
    androidScheme: "https",
  },
};

export default config;
