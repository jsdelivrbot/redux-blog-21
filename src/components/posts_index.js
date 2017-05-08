import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';

import { Link } from 'react-router-dom';
import { fetchPosts } from '../actions';
    
class PostsIndex extends Component {
    
    componentDidMount() {
        this.props.fetchPosts();
    }

    _renderPosts() {
        return _.map(this.props.posts, post => {
            return (
                <li style={{cursor:'pointer'}} className="list-group-item" key={post.id}>
                    <Link className="special-link" to={`/posts/${post.id}`}>
                        <h3>{post.id} - {post.title}</h3>
                        <p>
                            {post.content}
                        </p>
                    </Link>
                </li>
            )
        });
    }

    render() {  
        return (
            <div>
                <div className="text-xs-right">
                    <Link className="btn btn-primary" to="/posts/new">
                        Add a Post
                    </Link>
                </div>
                <h3>Posts</h3>
                <ul className="list-group">
                    {this._renderPosts()}
                </ul>
            </div>
        )
    }
}

function mapStateToProps({posts}) {    
    return { posts };
};

//connect first argument: states to props
//connect second argument: actions to props
export default connect( mapStateToProps, { fetchPosts })(PostsIndex) 
