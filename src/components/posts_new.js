import React, { Component } from 'react';
//helpers redux-form
import { Field, reduxForm } from 'redux-form';
import { Link } from 'react-router-dom';

import { connect } from 'react-redux';
import { createPost } from '../actions';

class PostsNew extends Component {

    _renderField(field) {
        //field contain event handlers
        const { meta: { touched, error } } = field;
        const className = `form-group ${touched && error ? 'has-danger': ''}`;

        return (
            <div className={className}>
                <label>{field.label}</label>
                <input
                    className="form-control"
                    type="text"
                    {...field.input}
                />
                <div className = "text-help">
                    {field.meta.touched ? field.meta.error : ''}
                </div>
            </div>
        )
    }

    _onSubmit(values) {
        this.props.createPost(values, () => {
            this.props.history.push("/");
        });
    }

    render() {
        const { handleSubmit } = this.props;

        return(
            <form onSubmit={handleSubmit(this._onSubmit.bind(this))} >
                <Field
                    label = "Title"
                    name="title"
                    component={this._renderField}
                />
                <Field
                    label = "Categories"
                    name="categories"
                    component={this._renderField}
                />
                <Field
                    label = "Post Content"
                    name="content"
                    component={this._renderField}
                />
                <button type="submit" className="btn btn-primary">Submit</button>
                <Link className="btn btn-danger" to="/">
                    Cancel
                </Link>
            </form>
        )
    }
}

function validate(values) {
    const errors = {};

    //validate the inputs from values
    if (!values.title) {
        errors.title = 'Enter a title';
    }

    if (!values.categories) {
        errors.categories = 'Enter some categories!';
    }

    if (!values.content) {
        errors.content = 'Enter some content please!';
    }

    return errors;
};

export default reduxForm({
    validate,
    form: 'PostsNewForm'
})(
   connect(null, { createPost }) (PostsNew)
);