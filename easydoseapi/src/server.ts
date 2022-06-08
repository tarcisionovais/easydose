import app from "./app";

import { connectDatabase } from "./database";

connectDatabase();

const PORT = process.env.PORT || 3003;

app.listen(PORT, () => {
    console.log(`Running at http://localhost:${PORT}`);
});