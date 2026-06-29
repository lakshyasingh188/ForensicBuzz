export default function handler(req, res) {
    const { id } = req.query;
    if (!id) return res.status(400).send("File ID missing!");
    
    // Google Drive direct download bypass link
    const directUrl = `https://drive.google.com/uc?export=download&confirm=t&id=${id}`;
    
    res.writeHead(302, { 'Location': directUrl });
    res.end();
}
