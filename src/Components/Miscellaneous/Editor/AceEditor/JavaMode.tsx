import { Card, CardBody, Col } from "reactstrap";
import { JavaModeHeading } from "@/Constant";
import { Highlight, themes } from "prism-react-renderer";
import { typeScriptData } from "@/Data/Miscellaneous/Editor/Editor";
import CardCommonHeader from "@/CommonComponent/CommonCardHeader/CardCommonHeader";

const JavaMode = () => {
  return (
    <Col xl="6">
      <Card>
        <CardCommonHeader title={JavaModeHeading} />
        <CardBody>
          <Highlight theme={themes.vsDark} code={typeScriptData} language="Java">
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

export default JavaMode;
