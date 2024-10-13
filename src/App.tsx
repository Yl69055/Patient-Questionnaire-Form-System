import React, { useState, useEffect } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Clipboard } from 'lucide-react';
import Page1 from './patient_assessment/tsx/page1';
import Page2 from './patient_assessment/tsx/page2';
import Page3 from './patient_assessment/tsx/page3';
import Page4 from './patient_assessment/tsx/page4';
import Page5 from './patient_assessment/tsx/page5';
import { FormInputs } from './types';

function App() {
  const [page, setPage] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [formData, setFormData] = useState<Partial<FormInputs>>({});
  const { handleSubmit, control, formState: { errors }, setValue } = useForm<FormInputs>();

  useEffect(() => {
    console.log('组件已挂载');
  }, []);

  useEffect(() => {
    // 当页面改变时，使用存储的formData填充表单字段
    Object.entries(formData).forEach(([name, value]) => {
      setValue(name as keyof FormInputs, value);
    });
  }, [page, formData, setValue]);

  const onSubmit: SubmitHandler<FormInputs> = async (data) => {
    console.log('onSubmit函数被调用');
    setIsSubmitting(true);
    setSubmitError(null);
    try {
      console.log('提交表单数据:', data);
      const response = await fetch('http://localhost:5001/api/save-questionnaire', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          patientName: data.name,
          age: data.age,
          gender: data.gender,
          symptoms: data.symptoms,
          medicalHistory: data.medicalHistory,
        }),
      });

      console.log('收到响应:', response);

      if (!response.ok) {
        throw new Error(`表单提交失败: ${response.status} ${response.statusText}`);
      }

      const result = await response.json();
      console.log('表单提交结果:', result);
      alert('表单提交成功！');
    } catch (error: unknown) {
      console.error('表单提交错误:', error);
      setSubmitError(`提交表单时出错，请稍后重试。错误: ${error instanceof Error ? error.message : String(error)}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  const nextPage = () => {
    console.log('点击下一页');
    setPage((prevPage) => Math.min(prevPage + 1, 5));
  };

  const prevPage = () => {
    console.log('点击上一页');
    setPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const updateFormData = (data: Partial<FormInputs>) => {
    setFormData(prevData => ({ ...prevData, ...data }));
  };

  const renderPage = () => {
    console.log('渲染页面:', page);
    const props = { control, formData, updateFormData };
    switch (page) {
      case 1:
        return <Page1 {...props} />;
      case 2:
        return <Page2 {...props} />;
      case 3:
        return <Page3 {...props} />;
      case 4:
        return <Page4 {...props} />;
      case 5:
        return <Page5 {...props} />;
      default:
        return null;
    }
  };

  console.log('当前页面:', page);

  return (
    <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
      <div className="relative py-3 sm:max-w-xl sm:mx-auto">
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-light-blue-500 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
        <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
          <div className="max-w-md mx-auto">
            <div className="flex items-center space-x-5">
              <div className="h-14 w-14 bg-cyan-200 rounded-full flex items-center justify-center">
                <Clipboard className="h-8 w-8 text-cyan-600" />
              </div>
              <div className="block pl-2 font-semibold text-xl self-start text-gray-700">
                <h2 className="leading-relaxed">患者问卷调查</h2>
                <p className="text-sm text-gray-500 font-normal leading-relaxed">
                  第{page}页
                </p>
              </div>
            </div>
            <form className="divide-y divide-gray-200" onSubmit={handleSubmit(onSubmit)}>
              {renderPage()}
              {submitError && <p className="text-red-500 mt-2">{submitError}</p>}
              <div className="pt-4 flex items-center space-x-4">
                {page > 1 && (
                  <button
                    type="button"
                    onClick={prevPage}
                    className="bg-gray-300 flex justify-center items-center w-full text-gray-700 px-4 py-3 rounded-md focus:outline-none hover:bg-gray-400 transition-colors"
                    disabled={isSubmitting}
                  >
                    上一页
                  </button>
                )}
                {page < 5 ? (
                  <button
                    type="button"
                    onClick={nextPage}
                    className="bg-blue-500 flex justify-center items-center w-full text-white px-4 py-3 rounded-md focus:outline-none hover:bg-blue-600 transition-colors"
                    disabled={isSubmitting}
                  >
                    下一页
                  </button>
                ) : (
                  <button
                    type="submit"
                    className="bg-green-500 flex justify-center items-center w-full text-white px-4 py-3 rounded-md focus:outline-none hover:bg-green-600 transition-colors"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? '提交中...' : '提交'}
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
