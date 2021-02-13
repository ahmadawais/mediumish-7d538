import React from 'react';
import _ from 'lodash';

import {Layout} from '../components/index';
import {htmlToReact, withPrefix, markdownify} from '../utils';
import FormField from '../components/FormField';

export default class Contact extends React.Component {
    render() {
        return (
            <Layout {...this.props}>
            <article className="post page post-full">
              <header className="post-header inner-md">
                <h1 className="post-title">{_.get(this.props, 'page.frontmatter.title', null)}</h1>
                {_.get(this.props, 'page.frontmatter.subtitle', null) && (
                <div className="post-subtitle">
                  {htmlToReact(_.get(this.props, 'page.frontmatter.subtitle', null))}
                </div>
                )}
              </header>
              {_.get(this.props, 'page.frontmatter.img_path', null) && (
              <div className="post-thumbnail">
                <img className="thumbnail" src={withPrefix(_.get(this.props, 'page.frontmatter.img_path', null))} alt={_.get(this.props, 'page.frontmatter.img_alt', null)} />
              </div>
              )}
              <div className="post-content inner-md">
                {markdownify(_.get(this.props, 'page.markdown', null))}
                <form name={_.get(this.props, 'page.frontmatter.form_id', null)} id={_.get(this.props, 'page.frontmatter.form_id', null)} {...(_.get(this.props, 'page.frontmatter.form_action', null) ? ({action: _.get(this.props, 'page.frontmatter.form_action', null)}) : null)}method="POST" data-netlify="true" data-netlify-honeypot="bot-field">
                  <div className="screen-reader-text">
                    <label>Don't fill this out if you're human: <input name="bot-field" /></label>
                  </div>
                  <input type="hidden" name="form-name" value={_.get(this.props, 'page.frontmatter.form_id', null)} />
                  {_.map(_.get(this.props, 'page.frontmatter.form_fields', null), (field, field_idx) => (
                    <FormField key={field_idx} {...this.props} field={field} />
                  ))}
                  <div className="form-submit">
                    <button type="submit" className="button">{_.get(this.props, 'page.frontmatter.submit_label', null)}</button>
                  </div>
                </form>
              </div>
            </article>
            </Layout>
        );
    }
}
