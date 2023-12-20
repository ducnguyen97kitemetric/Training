import { updateUser } from '@/services/ant-design-pro/api';
import { PageContainer, ProForm, ProFormText, ProFormSelect } from '@ant-design/pro-components';
import { useModel, AxiosError } from '@umijs/max';
import { Card, Button, theme, message } from 'antd';
import React, { useState, useCallback } from 'react';
// import { UserType } from 'types/User';

enum UserType {
  admin,
  basic
}

const Welcome: React.FC = () => {
  const [formShow, setFormShow] = useState(false);
  const { token } = theme.useToken();
  const { initialState, setInitialState } = useModel('@@initialState');
  const user = initialState?.currentUser;
  const jwtToken = initialState?.token;

  const showProfileForm = useCallback(() => setFormShow(true), [setFormShow]);
  const hideProfileForm = useCallback(() => setFormShow(false), [setFormShow]);

  const ProfileForm = useCallback(() => (
    <ProForm
      onFinish={async (values) => {
        if (!user || !user.id || !jwtToken) return;
        try {
          const result = await updateUser(user.id, { fullName: values.fullName }, jwtToken);
          setInitialState((s) => ({
            ...s,
            currentUser: result.user
          }))
          hideProfileForm();
        } catch (_error) {
          const error = _error as AxiosError<API.ApiErrorResponse, any>;
          message.error(error.response?.data?.message);
        }
        
      }}
      onReset={hideProfileForm}
      initialValues={{
        email: user?.email,
        fullName: user?.fullName,
        userType: user?.userType,
      }}
      submitter={{
        searchConfig: {
          submitText: 'Save',
          resetText: 'Cancel',
        },
      }}
    >
      <ProFormText
        width="md"
        name="email"
        label="Email"
        disabled
        
      />
      <ProFormText
        width="md"
        name="fullName"
        label="Full Name"
      />

      <ProFormSelect
        options={[
          {
            value: UserType.admin,
            label: 'Admin',
          },
          {
            value: UserType.basic,
            label: 'Basic',
          },
        ]}
        width="md"
        name="userType"
        label="User Type"
        disabled
      />
    </ProForm>
  ), [hideProfileForm]);

  return (
    <PageContainer>
      <Card
        style={{
          borderRadius: 8,
        }}
        bodyStyle={{
          backgroundImage:
            initialState?.settings?.navTheme === 'realDark'
              ? 'background-image: linear-gradient(75deg, #1A1B1F 0%, #191C1F 100%)'
              : 'background-image: linear-gradient(75deg, #FBFDFF 0%, #F5F7FF 100%)',
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            backgroundPosition: '100% -30%',
            backgroundRepeat: 'no-repeat',
            backgroundSize: '274px auto',
            backgroundImage:
              "url('https://gw.alipayobjects.com/mdn/rms_a9745b/afts/img/A*BuFmQqsB2iAAAAAAAAAAAAAAARQnAQ')",
          }}
        >
          <div
            style={{
              fontSize: '20px',
              color: token.colorTextHeading,
            }}
          >
            Welcome {initialState?.currentUser?.fullName}
          </div>
          <div
            style={{
              fontSize: '16px',
              color: token.colorTextHeading,
            }}
          >
            {initialState?.currentUser?.email}
          </div>
          {formShow ? <ProfileForm /> : (
            <Button block onClick={showProfileForm}>Edit Profile</Button>
          )}
        </div>
      </Card>
    </PageContainer>
  );
};

export default Welcome;
