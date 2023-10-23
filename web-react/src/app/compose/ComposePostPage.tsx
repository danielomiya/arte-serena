import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Divider,
  Button,
  Toast,
  Form,
  Input,
  ImageUploadItem,
  NavBar,
} from "antd-mobile";
import styled from "styled-components";
import { BottomPhotosMenu } from "./BottomPhotosMenu";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import { CloseOutlined } from "@ant-design/icons";
import { useUploadImageMutation } from "../../graphql/upload.generated";
import "swiper/css";
import "swiper/css/navigation";

const BottomMenuWrapper = styled.div`
  padding-bottom: 5px;
  margin-bottom: 5px;
  border-bottom: 1px ${props => props.theme.styles["border-color-base"]} solid;
`;

const PreviewWrapper = styled(Swiper)`
  width: 100%;
  object-fit: cover;

  --swiper-navigation-color: ${(props) => props.theme.styles["primary-color"]};
  --swiper-pagination-color: ${(props) => props.theme.styles["primary-color"]};
`;

const Image = styled.img`
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const ActionButton = styled.button`
  border: none;
  border-radius: 0 0 0 12px;
  position: absolute;
  top: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.7);
  color: white;
  width: 14px;
  font-size: 8px;
  height: 14px;
  cursor: pointer;
  margin: 3px 3px 0 0;
`;

type PreviewProps = {
  assets: ImageUploadItem[];
  onClose?: (iui: ImageUploadItem) => void;
};

const Preview = ({ assets, onClose }: PreviewProps) => {
  if (assets.length === 0) return null;
  return (
    <PreviewWrapper
      slidesPerView={assets.length === 1 ? 1 : 1.3}
      spaceBetween={10}
      modules={[Pagination]}
    >
      {assets.map((asset) => (
        <SwiperSlide key={asset.url}>
            <Image src={asset.url} alt="Image uploaded by user." />
            {onClose && (
              <ActionButton type="button" onClick={() => onClose(asset)}>
                <CloseOutlined
                  style={{
                    position: "absolute",
                    left: "4px",
                    top: "3px",
                  }}
                />
              </ActionButton>
            )}
        </SwiperSlide>
      ))}
    </PreviewWrapper>
  );
};

export const ComposePostPage = () => {
  const navigate = useNavigate();
  const goBack = () => navigate(-1);
  const [fileList, setFileList] = useState<ImageUploadItem[]>([]);
  const [uploadImageMutation] = useUploadImageMutation();

  const handleUpload = async (file: File): Promise<ImageUploadItem> => {
    const { type, size, name } = file;

    const { data, errors } = await uploadImageMutation({
      variables: {
        input: {
          fileName: name,
          fileType: type,
          sizeInBytes: size,
        },
      },
    });

    if (errors || data?.uploadImage.error) {
      Toast.clear();
      Toast.show({
        icon: "fail",
        content: "Erro ao enviar imagem... tente novamente mais tarde!",
      });
      console.log(errors || data?.uploadImage.error);
      throw errors;
    }

    const signedUrl = data?.uploadImage.uploadUrl as string;
    const response = await fetch(signedUrl, {
      method: "PUT",
      headers: {
        "Content-Type": file.type,
      },
      body: file,
    });

    if (!response.ok) {
      Toast.clear();
      Toast.show({
        icon: "error",
        content: "Erro ao enviar imagem... tente novamente mais tarde!",
      });
      throw new Error(await response.text());
    }

    return {
      url: signedUrl.substring(0, signedUrl.indexOf("?")),
    };
  };

  return (
    <>
      <Form>
        <NavBar
          onBack={goBack}
          right={
            <Form.Item
              style={{ marginBottom: "0px" }}
              shouldUpdate
              childElementPosition="right"
            >
              {({ getFieldsValue }) => {
                const { title } = getFieldsValue();
                const formIsComplete = !!title;
                return (
                  <Button
                    type="submit"
                    color="primary"
                    disabled={!formIsComplete}
                  >
                    Publicar
                  </Button>
                );
              }}
            </Form.Item>
          }
        />
        <BottomMenuWrapper>
          <Form.Item name="title" label={<label>Título</label>}>
            <Input data-testid="title" placeholder="Adicione um título" />
          </Form.Item>
          <BottomPhotosMenu
            fileList={fileList}
            setFileList={setFileList}
            handleUpload={handleUpload}
          />
        </BottomMenuWrapper>
        {fileList.length === 0 && <Divider />}
        <Preview
          assets={fileList}
          onClose={({ url }) =>
            setFileList(fileList.filter((f) => f.url != url))
          }
        />
      </Form>
    </>
  );
};
