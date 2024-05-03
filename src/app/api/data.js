let formData; 

export default function handler(req, res) {
  if (req.method === 'POST') {
    formData = req.body;
    console.log(formData+"api")
    // res.status(200).send('Form data received.');
  } else if (req.method === 'GET') {
    res.status(200).json(formData);  // 修改这行，返回 formData 数据
  } else {
    // res.status(405).send('Method not allowed.');
  }
}