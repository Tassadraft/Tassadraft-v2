const config: {
    webDir: string;
    appName: string;
    appId: string;
    loggingBehavior: 'none' | 'debug' | 'production';
    webContentsDebuggingEnabled: boolean;
} = {
    appId: 'com.example.mysveltekitapp',
    appName: 'Tassadraft-v2',
    webDir: 'dist',
    loggingBehavior: 'production',
    webContentsDebuggingEnabled: false,
};

export default config;
