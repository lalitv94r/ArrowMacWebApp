import { Card, CardBody, Col } from "reactstrap";
import { JavascriptModeTitle } from "@/Constant";
import { Highlight, themes } from "prism-react-renderer";
import { javaData } from "@/Data/Miscellaneous/Editor/Editor";
import CardCommonHeader from "@/CommonComponent/CommonCardHeader/CardCommonHeader";

const JavascriptMode = () => {
  return (
    <Col xl="6">
      <Card>
        <CardCommonHeader title={JavascriptModeTitle} />
        <CardBody>
          <Highlight theme={themes.vsDark} code={javaData} language="javascript">
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

export default JavascriptMode;
