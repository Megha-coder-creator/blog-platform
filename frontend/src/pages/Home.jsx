import { useEffect, useState } from "react";
import API from "../services/api";
import PostCard from "../components/PostCard";
import axios from "axios";
import { Link } from "react-router-dom";
import { Container, Row, Col, Card, Button } from "react-bootstrap";

function Home() {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const res = await axios.get("http://localhost:5000/api/posts");
                setPosts(res.data);
            } catch (err) {
                console.error(err);
            }
        };

        fetchPosts();
    }, []);

    return (
        <Container className="mt-5">
            <div className="text-center"
            style={{
            padding:"70px 0 60px"
        }}
        >
                <h1 classname="display-4 fw-bold mb-3">Latest Articles</h1>
                <p className="lead text-secondary mt-3">
                    Discover stories, ideas and experiences shared by our community.
                </p>
            </div>

            <Row className="g-5 justify-content-center">
                {posts.map((post) => (
                    <Col md={6} lg={4} xl={4} className="mb-4" key={post._id}>
                        <Card
                            className="h-100 shadow-sm border-0"
                            style={{
                                borderRadius: "20px",
                                minHeight:"470px",
                                transition: "all .3s ease",
                                overflow: "hidden"
                            }}
                        >
                            <Card.Img
                                src="https://images.unsplash.com/photo-1499750310107-5fef28a66643"
                                style={{ height: "200px", objectFit: "cover" }}
                            />


                            <Card.Body className="p-4 d-flex flex-column">

                                <Card.Title className="fw-bold fs-4">
                                    {post.title}
                                </Card.Title>

                                <Card.Text
                                    className="text-secondary"
                                    style={{
                                        lineHeight: "1.8",
                                        minHeight: "90px"
                                    }}
                                >
                                    {post.content.length > 120
                                        ? post.content.substring(0, 120) + "..."
                                        : post.content}
                                </Card.Text>

                                <Card.Footer className="bg-transparent border-0 px-0">
                                    <small className="text-muted">
                                        Author: {post.author.name}
                                    </small>

                                    <br />
                                    <div className="mt-auto">
                                        <Button
                                            className="rounded-pill px-4"
                                            as={Link}
                                            to={`/post/${post._id}`}
                                            className="rounded-pill px-4 py-2"
                                            variant="primary"

                                        >
                                            Read More
                                        </Button>
                                    </div>

                                </Card.Footer>

                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
        </Container >
    );
}

export default Home;