export default async function (cardText) {
  return `<?xml version="1.0" encoding="utf-8"?>
  <DesktopLabel Version="1">
    <DYMOLabel Version="3">
      <Description>DYMO Label</Description>
      <Orientation>Landscape</Orientation>
      <LabelName>WhiteNameBadgeS0722560</LabelName>
      <InitialLength>0</InitialLength>
      <BorderStyle>SolidLine</BorderStyle>
      <DYMORect>
        <DYMOPoint>
          <X>0.23</X>
          <Y>0.05666666</Y>
        </DYMOPoint>
        <Size>
          <Width>3.21</Width>
          <Height>1.53</Height>
        </Size>
      </DYMORect>
      <BorderColor>
        <SolidColorBrush>
          <Color A="1" R="0" G="0" B="0"> </Color>
        </SolidColorBrush>
      </BorderColor>
      <BorderThickness>1</BorderThickness>
      <Show_Border>False</Show_Border>
      <DynamicLayoutManager>
        <RotationBehavior>ClearObjects</RotationBehavior>
        <LabelObjects>
          <TextObject>
            <Name>ITextObject1</Name>
            <Brushes>
              <BackgroundBrush>
                <SolidColorBrush>
                  <Color A="0" R="0" G="0" B="0"> </Color>
                </SolidColorBrush>
              </BackgroundBrush>
              <BorderBrush>
                <SolidColorBrush>
                  <Color A="1" R="0" G="0" B="0"> </Color>
                </SolidColorBrush>
              </BorderBrush>
              <StrokeBrush>
                <SolidColorBrush>
                  <Color A="1" R="0" G="0" B="0"> </Color>
                </SolidColorBrush>
              </StrokeBrush>
              <FillBrush>
                <SolidColorBrush>
                  <Color A="0" R="0" G="0" B="0"> </Color>
                </SolidColorBrush>
              </FillBrush>
            </Brushes>
            <Rotation>Rotation0</Rotation>
            <OutlineThickness>1</OutlineThickness>
            <IsOutlined>False</IsOutlined>
            <BorderStyle>SolidLine</BorderStyle>
            <Margin>
              <DYMOThickness Left="0" Top="0" Right="0" Bottom="0" />
            </Margin>
            <HorizontalAlignment>Center</HorizontalAlignment>
            <VerticalAlignment>Middle</VerticalAlignment>
            <FitMode>AlwaysFit</FitMode>
            <IsVertical>False</IsVertical>
            <FormattedText>
              <FitMode>AlwaysFit</FitMode>
              <HorizontalAlignment>Center</HorizontalAlignment>
              <VerticalAlignment>Middle</VerticalAlignment>
              <IsVertical>False</IsVertical>
              <LineTextSpan>
                <TextSpan>
                  <Text>${cardText}</Text>
                  <FontInfo>
                    <FontName>Segoe UI</FontName>
                    <FontSize>78.8</FontSize>
                    <IsBold>False</IsBold>
                    <IsItalic>False</IsItalic>
                    <IsUnderline>False</IsUnderline>
                    <FontBrush>
                      <SolidColorBrush>
                        <Color A="1" R="0" G="0" B="0"> </Color>
                      </SolidColorBrush>
                    </FontBrush>
                  </FontInfo>
                </TextSpan>
              </LineTextSpan>
            </FormattedText>
            <ObjectLayout>
              <DYMOPoint>
                <X>0.23</X>
                <Y>0.08319428</Y>
              </DYMOPoint>
              <Size>
                <Width>3.074587</Width>
                <Height>1.46</Height>
              </Size>
            </ObjectLayout>
          </TextObject>
        </LabelObjects>
      </DynamicLayoutManager>
    </DYMOLabel>
    <LabelApplication>Blank</LabelApplication>
    <DataTable>
      <Columns></Columns>
      <Rows></Rows>
    </DataTable>
  </DesktopLabel>`
}