import { Card, CardBody, Col } from "reactstrap";
import { CSSModeHeading } from "@/Constant";
import { Highlight, themes } from "prism-react-renderer";
import { cssData } from "@/Data/Miscellaneous/Editor/Editor";
import CardCommonHeader from "@/CommonComponent/CommonCardHeader/CardCommonHeader";

const CssMode = () => {
  return (
    <Col xl="6">
      <Card>
        <CardCommonHeader title={CSSModeHeading} />
        <CardBody>
          <Highlight theme={themes.vsDark} code={cssData} language="css">
            {({ style, tokens, getLineProps, getTokenProps }) => (
              <pre style={style}>
                {tokens.map((line, i) => (
                  <div key={i} {...getLineProps({ line })}>
                    {line.map((token, key) => (
                      <span key={key} {...getTokenProps({ token })} />
                    ))}
                  </div>
                ))}
              </pre>
            )}
          </Highlight>
        </CardBody>
      </Card>
    </Col>
  );
};

export default CssMode;
