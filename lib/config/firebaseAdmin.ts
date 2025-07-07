import admin from 'firebase-admin';
//n tem utilidade, vou deixar aq por enquanto
interface firebaseAdminAppParams {
    projectId: string,
    clientEmail: string,
    storageBucket: string,
    privateKey: string
}

function formatPrivateKey(privateKey: string) {
    return privateKey.replace(/\\n/g, '\n');
}

export function createFirebaseAdminApp(params: firebaseAdminAppParams) {
    const formattedPrivateKey = formatPrivateKey(params.privateKey);
    
    if(admin.apps.length > 0) {
        return admin.app();
    }

    const cert =  admin.credential.cert({
        projectId: params.projectId,
        clientEmail: params.clientEmail,
        privateKey: formattedPrivateKey
    })

    return admin.initializeApp({
        credential: cert,
        //project
    })
}
