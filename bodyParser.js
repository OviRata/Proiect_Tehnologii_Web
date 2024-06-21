async function getBodyFromRequest(req) {
  return new Promise(async (resolve, reject) => {
    try {
      let body = '';
      await req.on('data', chunk => {
        body += chunk.toString();
      });

      await req.on('end', () => {
        resolve(body);
      });
    } catch (error) {
      reject(JSON.stringify({ message: error.message }));
    }
  });
}

module.exports={getBodyFromRequest}
