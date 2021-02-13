import React from 'react';
import _ from 'lodash';
import moment from 'moment-strftime';

import {Layout} from '../components/index';
import {htmlToReact, withPrefix, markdownify} from '../utils';

export default class Post extends React.Component {
    render() {
        return (
            <Layout {...this.props}>
              <article className="post post-full">
                <header className="post-header inner-md">
                  <div className="post-meta">
                    <time className="published"
                      dateTime={moment(_.get(this.props, 'page.frontmatter.date', null)).strftime('%Y-%m-%d %H:%M')}>{moment(_.get(this.props, 'page.frontmatter.date', null)).strftime('%A, %B %e, %Y')}</time>
                  </div>
                  <h1 className="post-title">{_.get(this.props, 'page.frontmatter.title', null)}</h1>
                  {_.get(this.props, 'page.frontmatter.subtitle', null) && (
                  <div className="post-subtitle">
                    {htmlToReact(_.get(this.props, 'page.frontmatter.subtitle', null))}
                  </div>
                  )}
                </header>
                {_.get(this.props, 'page.frontmatter.content_img_path', null) && (
                <div className="post-thumbnail">
                  <img className="thumbnail" src={withPrefix(_.get(this.props, 'page.frontmatter.content_img_path', null))} alt={_.get(this.props, 'page.frontmatter.content_img_alt', null)} />
                </div>
                )}
                <div className="post-content inner-md">
                  {markdownify(_.get(this.props, 'page.markdown', null))}
                </div>
              </article>
            </Layout>
        );
    }
}
