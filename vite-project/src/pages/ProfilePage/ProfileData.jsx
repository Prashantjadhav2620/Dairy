
import React, { useRef, useState,useEffect } from 'react';
import {
  Container,
  Row,
  Col,
  Breadcrumb,
  Card,
  Button,
  ListGroup,
  ProgressBar,
  Form
} from 'react-bootstrap';

// import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS

export default function ProfileData() {

  useEffect(()=>{
    
  })
  
  const user = localStorage.getItem('user')
  console.log("user", JSON.stringify(user))
  const userData = JSON.parse(user);

  // Access the emailId
  const emailId = userData.data.User.Email;

  console.log("Email Id:", emailId);

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    userId: '',
    addressLine1: '',
    addressLine2: '',
    city: '',
    state: '',
    postalCode: '',
    country: ''
  });

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

  const handleSubmit = () => {
    // You can perform any actions you need here, such as sending the data to a backend server
    console.log({
      fullName,
      email,
      phone,
      userId,
      addressLine1,
      addressLine2,
      city,
      state,
      postalCode,
      country,
    });
  };

  // useEffect(() => {
  //   // Fetch data from API
  //   fetchDataFromAPI();
  // }, []);

  // Function to fetch data from API
  const fetchDataFromAPI = async () => {
    try {
      const response = await fetch(`http://localhost:2620/api/user/getallByEmail/${emailId}`);
      if (!response.ok) {

        throw new Error('Failed to fetch data');
      }
      const data = await response.json();
      console.log("DATA",data)
      // Update form data state with fetched data
      setFormData(data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  // console.log("Formdata",formData[0]['emailId'])
  console.log("selectedImageUrl", selectedImageUrl)

  const handleSaveClick = async () => {
    if (selectedImageUrl) {
      try {
        // Replace 'YOUR_API_ENDPOINT' with the actual API endpoint for file upload
        const apiEndpoint = 'http://localhost:2620/api/UserImage/postUserImageByIdAsync';
        const formData1 = new FormData();
        console.log("selectedImageUrl", selectedImageUrl)
        formData1.append('Id', formData[0]['UserId']);
        formData1.append('file', selectedImageUrl);
        formData1.append('Name', formData[0]['username']);

        console.log("formData11",formData1)
        const response = await fetch(apiEndpoint, {
          method: 'POST',
          body: formData1,
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
          <br />

          <Col className="mb-12">

            {/* //First Row  */}
            <Row>
              <Col sm="6">
                <Card className="mb-4">
                  <Card.Body>
                    <Row>
                      <Col sm="3">
                        <Card.Text >Full Name</Card.Text>
                      </Col>
                      <Col sm="9">
                        <Form.Control type="text" placeholder="Enter Full Name" value={formData[0]['username']} onChange={(e) => setFormData({ ...formData, fullName: e.target.value })} />
                      </Col>
                    </Row>
                    <hr />
                  </Card.Body>
                </Card>
              </Col>

              <Col sm="6">
                <Card className="mb-4">
                  <Card.Body>
                    <Row>
                      <Col sm="3">
                        <Card.Text>Email Id</Card.Text>
                      </Col>
                      <Col sm="9">
                        <Form.Control type="text" placeholder="Enter Email Id" value={formData[0]['emailId']} onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
                      </Col>
                    </Row>
                    <hr />
                  </Card.Body>
                </Card>
              </Col>
            </Row>

            {/* //Sceound Row  */}
            <Row>
              <Col sm="6">
                <Card className="mb-4">
                  <Card.Body>
                    <Row>
                      <Col sm="3">
                        <Card.Text>Phone</Card.Text>
                      </Col>  
                      <Col sm="9">
                        <Form.Control type="text" placeholder="Enter Phone" value={formData[0]['mobileNumber']} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} />
                      </Col>
                    </Row>
                    <hr />
                  </Card.Body>
                </Card>
              </Col>

              <Col sm="6">
                <Card className="mb-4">
                  <Card.Body>
                    <Row>
                      <Col sm="3">
                        <Card.Text>User_Id</Card.Text>
                      </Col>
                      <Col sm="9">
                        <Form.Control type="text" placeholder="Enter User_Id" value={formData.userId} onChange={(e) => setFormData({ ...formData, userId: e.target.value })}  readOnly/>
                      </Col>
                    </Row>
                    <hr />
                  </Card.Body>
                </Card>
              </Col>
            </Row>

            {/* header */}
            <Row>
              <Col>
                <Breadcrumb className="bg-light rounded-3 p-3 mb-4">
                  <Breadcrumb.Item active>Address</Breadcrumb.Item>
                </Breadcrumb>
              </Col>
            </Row>

            {/* //Third Row  */}
            <Row>
              <Col sm="6">
                <Card className="mb-4">
                  <Card.Body>
                    <Row>
                      <Col sm="4">
                        <Card.Text>AddressLine1</Card.Text>
                      </Col>
                      <Col sm="9">
                        <Form.Control type="text" placeholder="Enter AddressLine1" value={formData.addressLine1} onChange={(e) => setFormData({ ...formData, addressLine1: e.target.value })} />
                      </Col>
                    </Row>
                    <hr />
                  </Card.Body>
                </Card>
              </Col>

              <Col sm="6">
                <Card className="mb-4">
                  <Card.Body>
                    <Row>
                      <Col sm="4">
                        <Card.Text>AddressLine2</Card.Text>
                      </Col>
                      <Col sm="9">
                        <Form.Control type="text" placeholder="Enter AddressLine2" value={formData.addressLine2} onChange={(e) => setFormData({ ...formData, addressLine2: e.target.value })} />
                      </Col>
                    </Row>
                    <hr />
                  </Card.Body>
                </Card>
              </Col>
            </Row>

            {/* //Fourt Row  */}
            <Row>
              <Col sm="6">
                <Card className="mb-4">
                  <Card.Body>
                    <Row>
                      <Col sm="3">
                        <Card.Text>City</Card.Text>
                      </Col>
                      <Col sm="9">
                        <Form.Select aria-label="City" value={formData.city} onChange={(e) => setFormData({ ...formData, city: e.target.value })}>
                          <option>Select City</option>
                          <option>New York</option>
                          <option>Los Angeles</option>
                          <option>Chicago</option>
                          {/* Add more options as needed */}
                        </Form.Select>
                      </Col>
                    </Row>
                    <hr />
                  </Card.Body>
                </Card>
              </Col>

              <Col sm="6">
                <Card className="mb-4">
                  <Card.Body>
                    <Row>
                      <Col sm="3">
                        <Card.Text>State</Card.Text>
                      </Col>
                      <Col sm="9">
                        <Form.Select
                          aria-label="City"
                          value={formData.state} onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                        >
                          <option value="">Select City</option>
                          <option value="New York">New York</option>
                          <option value="Los Angeles">Los Angeles</option>
                          <option value="Chicago">Chicago</option>
                          {/* Add more options as needed */}
                        </Form.Select>
                      </Col>
                    </Row>
                    <hr />
                  </Card.Body>
                </Card>
              </Col>
            </Row>

            {/* //Five Row  */}
            <Row>
              <Col sm="6">
                <Card className="mb-4">
                  <Card.Body>
                    <Row>
                      <Col sm="4">
                        <Card.Text>PostalCode</Card.Text>
                      </Col>
                      <Col sm="9">
                        <Form.Control type="text" placeholder="Enter PostalCode" value={formData.postalCode} onChange={(e) => setFormData({ ...formData, postalCode: e.target.value })} />
                      </Col>
                    </Row>
                    <hr />
                  </Card.Body>
                </Card>
              </Col>

              <Col sm="6">
                <Card className="mb-4">
                  <Card.Body>
                    <Row>
                      <Col sm="4">
                        <Card.Text>Country</Card.Text>
                      </Col>
                      <Col sm="9">
                        <Form.Select
                          aria-label="Country"
                          value={formData.country} onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                        >
                          <option value="">Select Country</option>
                          <option value="USA">USA</option>
                          <option value="Canada">Canada</option>
                          <option value="UK">UK</option>
                          {/* Add more options as needed */}
                        </Form.Select>
                      </Col>
                    </Row>
                    <hr />
                  </Card.Body>
                </Card>
              </Col>
            </Row>

            {/* //bUTTON Row  */}
            <Row>
              <Col sm="6" className="text-center">
                <Card className="mb-4">
                  <Card.Body>
                    <Form onSubmit={handleSubmit}>
                      <Button variant="primary" type="submit">Submit</Button>
                    </Form>
                    <hr />
                  </Card.Body>
                </Card>
              </Col>
            </Row>


          </Col>


        </Row>
      </Container>
    </section>
  );
}
