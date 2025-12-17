import admin from "firebase-admin";
import path from 'path';
import fs from "fs";
const serviceAccount = JSON.parse(fs.readFileSync(path.join(process.cwd(), "/src/config/firebase-admin-key.json"), "utf-8"));
if (!admin.apps.length) {
    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
    });
}
export { admin };
//# sourceMappingURL=firebase.js.map