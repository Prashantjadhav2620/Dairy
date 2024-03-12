
import React,{useRef,useState} from 'react';
import {
  Container,
  Row,
  Col,
  Breadcrumb,
  Card,
  Button,
  ListGroup,
  ProgressBar,
} from 'react-bootstrap';

// import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS

export default function ProfileData() {
    const fileInputRef = useRef(null);
    const [selectedImageUrl, setSelectedImageUrl] = useState(null);
  
    const handleUploadClick = () => {
      fileInputRef.current.click();
    };
  
    const handleFileChange = async (e) => {
      const selectedFile = e.target.files[0];
  
      if (selectedFile) {
        try {
          const imageUrl = await handleFileUpload(selectedFile);
          setSelectedImageUrl(imageUrl);
        } catch (error) {
          console.error('Error uploading image:', error);
        }
      }
    };
  
    const handleFileUpload = (file) => {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          // Simulating an asynchronous upload
          setTimeout(() => {
            resolve(reader.result);
          }, 1000);
        };
        reader.onerror = reject;
        reader.readAsDataURL(file);
      });
    };
  

    console.log("selectedImageUrl",selectedImageUrl)
    const handleSaveClick = async () => {
      if (selectedImageUrl) {
        try {
          // Replace 'YOUR_API_ENDPOINT' with the actual API endpoint for file upload
          const apiEndpoint = 'YOUR_API_ENDPOINT';
          const formData = new FormData();
          console.log("selectedImageUrl",selectedImageUrl)
          formData.append('file', selectedImageUrl);
  
          const response = await fetch(apiEndpoint, {
            method: 'POST',
            body: formData,
          });
  
          if (response.ok) {
            console.log('File uploaded successfully!');
            // You can handle the success scenario here
          } else {
            console.error('Error uploading file:', response.statusText);
            // You can handle the error scenario here
          }
        } catch (error) {
          console.error('Error uploading file:', error);
          // You can handle the error scenario here
        }
      }
    };
  
    const user = localStorage.getItem('user')
    console.log("user",JSON.stringify(user))
    
  return (
    <section style={{ backgroundColor: '#eee' }}>
      <Container className="py-5">
        <Row>
          <Col>
            <Breadcrumb className="bg-light rounded-3 p-3 mb-4">
              <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
              <Breadcrumb.Item active>User Profile</Breadcrumb.Item>
            </Breadcrumb>
          </Col>
        </Row>

        <Row>
          <Col lg="4">
            <Card className="mb-4">
              <Card.Body className="text-center">
              {/* <Card.Img
                src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3.webp"
                alt="avatar"
                className="rounded-circle mx-auto d-block"
                style={{ width: '150px' }}
                fluid
                /> */}
                  {(selectedImageUrl || selectedImageUrl === null) && (
            <Card.Img
              src={selectedImageUrl || "https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3.webp"}
              alt="avatar"
              className="rounded-circle mx-auto d-block"
              style={{ width: '150px' }}
              fluid
            />
          )}
                <p className="text-muted mb-4 mt-4">Prashant Shivaji Jadhav</p>
                <div className="d-flex justify-content-center mb-2">
                <div>
                    {/* <input
                        type="file"
                        accept="image/*"
                        style={{ display: 'none' }}
                        ref={fileInputRef}
                        onChange={handleFileChange}
                    /> */}
                    <input
                        type="file"
                        accept="image/*"
                        style={{ display: 'none' }}
                        ref={fileInputRef}
                        onChange={handleFileChange}
                    />
                    <Button className='bg-blue' onClick={handleUploadClick}>Upload Image</Button>
                    </div>
                  <Button variant="outline" className="ms-1 ml-5" onClick={handleSaveClick}>
                    Save
                  </Button>
                </div>
              </Card.Body>
            </Card>

            <Card className="mb-4 mb-lg-0">
              <Card.Body className="p-0">
                <ListGroup flush className="rounded-3">
                  <ListGroup.Item className="d-flex justify-content-between align-items-center p-3">
                    <i className="fas fa-globe fa-lg text-warning"></i>
                    <Card.Text>https://mdbootstrap.com</Card.Text>
                  </ListGroup.Item>
                  <ListGroup.Item className="d-flex justify-content-between align-items-center p-3">
                    <i className="fab fa-github fa-lg" style={{ color: '#333333' }}></i>
                    <Card.Text>mdbootstrap</Card.Text>
                  </ListGroup.Item>
                  <ListGroup.Item className="d-flex justify-content-between align-items-center p-3">
                    <i className="fab fa-twitter fa-lg" style={{ color: '#55acee' }}></i>
                    <Card.Text>@mdbootstrap</Card.Text>
                  </ListGroup.Item>
                  <ListGroup.Item className="d-flex justify-content-between align-items-center p-3">
                    <i className="fab fa-instagram fa-lg" style={{ color: '#ac2bac' }}></i>
                    <Card.Text>mdbootstrap</Card.Text>
                  </ListGroup.Item>
                  <ListGroup.Item className="d-flex justify-content-between align-items-center p-3">
                    <i className="fab fa-facebook fa-lg" style={{ color: '#3b5998' }}></i>
                    <Card.Text>mdbootstrap</Card.Text>
                  </ListGroup.Item>
                </ListGroup>
              </Card.Body>
            </Card>
          </Col>

          <Col lg="8">
            <Card className="mb-4">
              <Card.Body>
                <Row>
                  <Col sm="3">
                    <Card.Text>Full Name</Card.Text>
                  </Col>
                  <Col sm="9">
                    <Card.Text className="text-muted">Johnatan Smith</Card.Text>
                  </Col>
                </Row>
                <hr />
                {/* Add similar modifications for other rows */}
              </Card.Body>
            </Card>

            <Row>
              {/* Add similar modifications for the two columns */}
            </Row>
          </Col>
        </Row>
      </Container>
    </section>
  );
}
