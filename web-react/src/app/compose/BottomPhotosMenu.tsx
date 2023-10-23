import {
  ImageUploaderProps,
  ImageUploader,
  ImageUploadItem,
} from "antd-mobile";
import { CameraOutlined, PictureOutlined } from "@ant-design/icons";
import styled from "styled-components";

const UploaderWrapper = styled.div`
  height: 30px;
  width: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  border: 1px solid ${(props) => props.theme.styles["border-color-base"]};
`;

const Uploader = ({
  type,
  ...props
}: {
  type: "camera" | "gallery";
} & ImageUploaderProps) =>
  ({
    camera: (
      <ImageUploader capture="environment" {...props}>
        <UploaderWrapper>
          <CameraOutlined style={{}} />
        </UploaderWrapper>
      </ImageUploader>
    ),
    gallery: (
      <ImageUploader {...props}>
        <UploaderWrapper>
          <PictureOutlined style={{}} />
        </UploaderWrapper>
      </ImageUploader>
    ),
  })[type];

const ContainerWrapper = styled.div`
  display: flex;
  margin: 0px 5px;
  gap: 10px;

  :root:root {
    --gap-vertical: 6px;
  }
`;

export const BottomPhotosMenu = ({
  fileList,
  setFileList,
  handleUpload,
}: {
  fileList: ImageUploadItem[];
  setFileList: (iui: ImageUploadItem[]) => void;
  handleUpload: (f: File) => Promise<ImageUploadItem>;
}) => {
  return (
    <ContainerWrapper>
      <Uploader
        type="camera"
        accept="video/*,image/*"
        columns={0}
        renderItem={() => null}
        value={fileList}
        onChange={setFileList}
        upload={handleUpload}
        preview={false}
        showFailed={false}
      />
      <Uploader
        type="gallery"
        accept="video/*,image/*"
        columns={0}
        renderItem={() => null}
        value={fileList}
        onChange={setFileList}
        upload={handleUpload}
        preview={false}
        showFailed={false}
      />
    </ContainerWrapper>
  );
};
