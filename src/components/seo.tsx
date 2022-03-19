/**
 * SEO component that queries for data with
 *  Gatsby's useStaticQuery React hook
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import Helmet from 'react-helmet';
import { siteTitle } from '../utils/meta';

interface Props {
  description?: string;
  lang?: string;
  title: string;
}

const SEO = ({ description = '', lang = 'zh', title }: Props) => {
  return (
    <Helmet
      htmlAttributes={{
        lang,
      }}
      title={title}
      titleTemplate={`%s | ${siteTitle}`}
      meta={[
        {
          name: `description`,
          content: description,
        },
        {
          property: `og:title`,
          content: title,
        },
        {
          property: `og:description`,
          content: description,
        },
        {
          property: `og:type`,
          content: `website`,
        }
      ]}
    />
  );
};

export default SEO;
