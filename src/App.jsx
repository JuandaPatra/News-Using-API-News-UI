import React from "react";
import axios from "axios";
import { Image,  Card, Container, Navbar, NavDropdown, Nav, FormControl, Button } from "react-bootstrap";
import {BiSearch, BiCopyright, FaInstagram, FaTwitter, FaLine, FaFacebook}from "react-icons/all"
import AOS from "aos";
import "./style/home.scss";
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      region: "id",
      carousel: [],
      headline1: "",
      headline2: "",
      headline3: "",
      headline4: "",
    };
  }

  componentDidMount() {
    AOS.init({
      offset: 200,
      duration: 600,
      easing: "ease-in-sine",
      delay: 100,
    });
    axios
      .get(`https://newsapi.org/v2/top-headlines?country=${this.state.region}&apiKey=2058d0807b5d4157977655a1a6653a10`)
      .then((res) => {
        // console.log(res.data);
        this.setState({ data: res.data.articles, headline1: res.data.articles[0] });
        axios.get(`https://newsapi.org/v2/top-headlines?country=${this.state.region}&category=sport&apiKey=2058d0807b5d4157977655a1a6653a10`).then((res) => {
          this.setState({ headline2: res.data.articles[0] });
          axios.get(`https://newsapi.org/v2/top-headlines?country=${this.state.region}&category=entertainment&apiKey=2058d0807b5d4157977655a1a6653a10`).then((res) => {
            this.setState({ headline3: res.data.articles[0] });
            axios.get(`https://newsapi.org/v2/top-headlines?country=${this.state.region}&category=business&apiKey=2058d0807b5d4157977655a1a6653a10`).then((res) => {
              this.setState({ headline4: res.data.articles[0] });
            });
          });
        });
      })
      .catch((err) => console.log(err));
  }

  // componentDidUpdate(prevState){
  //   if(this.state.region !== prevState.region){
  //     axios
  //     .get(`https://newsapi.org/v2/top-headlines?country=${this.state.region}&apiKey=2058d0807b5d4157977655a1a6653a10`)
  //     .then((res) => {
  //       // console.log(res.data)
  //       this.setState({ data: res.data.articles  });
  //     })
  //     .catch((err) => console.log(err));
  //   }
  // }

  country = (reg) => {
    axios
      .get(
        `https://newsapi.org/v2/top-headlines?country=${reg}&apiKey=2058d0807b5d4157977655a1a6653a10
    `
      )
      .then((res) => {
        this.setState({ data: res.data.articles, region: reg, headline1: res.data.articles[0] });
      });
  };

  category = (cate) => {
    // console.log(cate);

    axios
      .get(`https://newsapi.org/v2/top-headlines?country=${this.state.region}&category=${cate}&apiKey=2058d0807b5d4157977655a1a6653a10`)
      .then((res) => {
        this.setState({ data: res.data.articles });
      })
      .catch((err) => console.log(err));
  };

  search=()=>{
    let type = this.refs.search.value

    axios.get(`https://newsapi.org/v2/everything?q=${type}&from=2021-09-14&sortBy=popularity&apiKey=2058d0807b5d4157977655a1a6653a10`)
    .then(res =>{
      this.setState({data : res.data.articles})
      this.refs.search.value =""
    })
    .catch(err => console.log(err))
  }
  render() {
    // console.log(this.state.headline2.url);
    // console.log(this.state.articles);
    // console.log(this.state.data[0])
    return (
      <div className="home">
        <Navbar bg="light" expand="lg">
          <Container>
            <Navbar.Brand href="#home">RJ-News</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="me-auto">
                {/* <Nav.Link href="#link">Link</Nav.Link> */}
                <NavDropdown title="Category" id="basic-nav-dropdown">
                  <NavDropdown.Item onClick={() => this.category("business")}>Business</NavDropdown.Item>
                  <NavDropdown.Item onClick={() => this.category("entertainment")}>Entertainment</NavDropdown.Item>
                  <NavDropdown.Item onClick={() => this.category("general")}>General</NavDropdown.Item>
                  <NavDropdown.Item onClick={() => this.category("sport")}>Sport</NavDropdown.Item>
                </NavDropdown>
                <NavDropdown title="Region" id="basic-nav-dropdown">
                  <NavDropdown.Item onClick={() => this.country("jp")}>Japan</NavDropdown.Item>
                  <NavDropdown.Item onClick={() => this.country("kr")}>South Korea</NavDropdown.Item>
                  <NavDropdown.Item onClick={() => this.country("us")}>USA</NavDropdown.Item>
                </NavDropdown>
              </Nav>
              <div style={{display:"flex"}}>
                <FormControl placeholder="Search" aria-label="Username" aria-describedby="basic-addon1" ref="search" />
                <Button variant="primary" onClick={this.search} href="#cardNews"><BiSearch/></Button>
              </div>
            </Navbar.Collapse>
          </Container>
        </Navbar>

        <h1 style={{ textAlign: "center" }}>Latest News </h1>
        <div className="headline" >
          <div className="headline1">
            <Card className="headline1-content" >
              <Card.Body>
                <Card.Img variant="top" src={this.state.headline1.urlToImage} />
                <Card.Title>
                  {" "}
                  <a href={this.state.headline1.url} style={{ textDecoration: "none", color: "slateblue" }}>
                    {this.state.headline1.title}
                  </a>
                </Card.Title>
                <Card.Text style={{ textAlign: "justify" }}>{this.state.headline1.description}</Card.Text>
                <div>
                  {/* <h1>{this.state.headline1.source.name}</h1> */}
                  <p>{new Date(this.state.headline1.publishedAt).toDateString()}</p>
                </div>
              </Card.Body>
            </Card>
          </div>
          <div className="headline2">
            <Card className="headline2-top" >
              <Card.Body>
                <Card.Img variant="top" src={this.state.headline2.urlToImage} className="gambar1" />
                {/* <Card.Title>{this.state.headline2.title}</Card.Title> */}
                <a href={this.state.headline2.url} style={{ textDecoration: "none", color: "slateblue" }}>
                  {this.state.headline2.title}
                </a>
                {/* <Card.Text>{this.state.headline2.description}</Card.Text> */}
                <div>
                  {/* <h1>{this.state.headline1.source.name}</h1> */}
                  {/* <p>{this.state.headline2.publishedAt}</p> */}
                </div>
              </Card.Body>
            </Card>
            <Card className="headline2-bottom" >
              <Card.Body>
                <Card.Img variant="top" src={this.state.headline4.urlToImage} className="gambar2" />
                {/* <Card.Title>{this.state.headline1.title}</Card.Title> */}
                <a href={this.state.headline4.url} style={{ textDecoration: "none", color: "slateblue" }}>
                  {this.state.headline4.title}
                </a>
                {/* <p >{this.state.headline4.title}</p> */}
                {/* <Card.Text>{this.state.headline1.description}</Card.Text> */}
                <div>
                  {/* <h1>{this.state.headline1.source.name}</h1> */}
                  {/* <p>{this.state.headline1.publishedAt}</p> */}
                </div>
              </Card.Body>
            </Card>
          </div>
          <div className="headline3">
            <Card className="headline3-content" >
              <Card.Body>
                <Card.Img variant="top" src={this.state.headline3.urlToImage} />
                <a href={this.state.headline4.url} style={{textDecoration:"none", color:"slateblue"}}>{this.state.headline3.title}</a>
                {/* <Card.Title>{this.state.headline3.title}</Card.Title> */}
                <Card.Text style={{ textAlign: "justify" }}>{this.state.headline3.description}</Card.Text>
                <div>
                  {/* <h1>{this.state.headline1.source.name}</h1> */}
                  <p>{new Date(this.state.headline3.publishedAt).toDateString()}</p>
                </div>
              </Card.Body>
            </Card>
          </div>
        </div>
        <h1 style={{ textAlign: "center" }}>Update News</h1>
        <div className="cardNews" id="cardNews">
          {this.state.data.map((item, index) => {
            return (
              <div className="card" data-aos="zoom-in" data-aos-duration="1500" key={index} >
                <div className="news-news">
                  <Image src={item.urlToImage} className="gambarNews" rounded />
                </div>
                <div style={{ marginRight: "10px" }}>
                  <a href={item.url} style={{ textDecoration: "none", color: "black" }}>
                    {item.title}
                  </a>
                  <div style={{ borderBottom: "5px solid slateblue" }}>
                    Author : {item.author} {new Date(item.publishedAt.slice(0, 10)).toDateString()}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        <footer>
          <div className="footer">
            <h1 style={{textAlign:"center"}}>RJ-News</h1>
            <div className="about">
              <p>About Us</p>
              <p>Advertise</p>
              <p>Policy</p>
              <p>Career</p>
            </div>
            <div className="socmed">
              <FaFacebook className="fb"/>
              <FaInstagram className="ig"/>
              <FaLine className="line"/>
              <FaTwitter className="twt"/>

            </div>
            <p style={{color:"black", textAlign:"center"}}>Copyright <BiCopyright/> 2021 RJ-News</p>
          </div>
        </footer>
      </div>
    );
  }
}

export default App;
