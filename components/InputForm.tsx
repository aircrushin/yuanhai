import React, { useState } from 'react';
import { CalendarType, Gender, UserInfo } from '../types';

interface InputFormProps {
  onSubmit: (data: UserInfo) => void;
  isLoading: boolean;
}

const InputForm: React.FC<InputFormProps> = ({ onSubmit, isLoading }) => {
  const [birthDate, setBirthDate] = useState('');
  const [birthTime, setBirthTime] = useState('12:00');
  const [calendarType, setCalendarType] = useState<CalendarType>(CalendarType.SOLAR);
  const [gender, setGender] = useState<Gender>(Gender.MALE);
  const [birthPlace, setBirthPlace] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!birthDate || !birthTime || !birthPlace) {
      alert("请填写完整的生辰信息与出生地");
      return;
    }
    onSubmit({
      birthDate,
      birthTime,
      calendarType,
      gender,
      birthPlace
    });
  };

  return (
    <div className="w-full max-w-md mx-auto p-6 md:p-8 bg-white/80 backdrop-blur-sm rounded-lg shadow-xl border border-stone-200">
      <div className="flex justify-center mb-6">
        <div className="w-1 h-16 bg-gradient-to-b from-stone-300 to-transparent"></div>
      </div>
      
      <h2 className="text-2xl font-serif text-center text-tao-ink mb-8">问缘 · 登记</h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        
        {/* Calendar Type & Gender Toggle Group */}
        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col space-y-2">
            <label className="text-xs text-stone-500 uppercase tracking-wider">历法</label>
            <div className="flex rounded-md shadow-sm">
              <button
                type="button"
                onClick={() => setCalendarType(CalendarType.SOLAR)}
                className={`flex-1 px-4 py-2 text-sm border border-r-0 rounded-l-md transition-colors ${
                  calendarType === CalendarType.SOLAR 
                    ? 'bg-stone-800 text-stone-50 border-stone-800' 
                    : 'bg-white text-stone-700 border-stone-300 hover:bg-stone-50'
                }`}
              >
                阳历
              </button>
              <button
                type="button"
                onClick={() => setCalendarType(CalendarType.LUNAR)}
                className={`flex-1 px-4 py-2 text-sm border rounded-r-md transition-colors ${
                  calendarType === CalendarType.LUNAR
                    ? 'bg-stone-800 text-stone-50 border-stone-800' 
                    : 'bg-white text-stone-700 border-stone-300 hover:bg-stone-50'
                }`}
              >
                阴历
              </button>
            </div>
          </div>

          <div className="flex flex-col space-y-2">
            <label className="text-xs text-stone-500 uppercase tracking-wider">乾坤</label>
            <div className="flex rounded-md shadow-sm">
               <button
                type="button"
                onClick={() => setGender(Gender.MALE)}
                className={`flex-1 px-4 py-2 text-sm border border-r-0 rounded-l-md transition-colors ${
                  gender === Gender.MALE 
                    ? 'bg-stone-800 text-stone-50 border-stone-800' 
                    : 'bg-white text-stone-700 border-stone-300 hover:bg-stone-50'
                }`}
              >
                乾(男)
              </button>
              <button
                type="button"
                onClick={() => setGender(Gender.FEMALE)}
                className={`flex-1 px-4 py-2 text-sm border rounded-r-md transition-colors ${
                  gender === Gender.FEMALE
                    ? 'bg-stone-800 text-stone-50 border-stone-800' 
                    : 'bg-white text-stone-700 border-stone-300 hover:bg-stone-50'
                }`}
              >
                坤(女)
              </button>
            </div>
          </div>
        </div>

        {/* Date & Time */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex flex-col space-y-2">
            <label htmlFor="birthDate" className="text-xs text-stone-500 uppercase tracking-wider">
              出生日期
            </label>
            <input
              id="birthDate"
              type="date"
              value={birthDate}
              onChange={(e) => setBirthDate(e.target.value)}
              className="w-full px-4 py-2 border border-stone-300 rounded-md focus:ring-1 focus:ring-stone-500 focus:border-stone-500 bg-stone-50 font-serif"
              required
            />
          </div>

          <div className="flex flex-col space-y-2">
            <label htmlFor="birthTime" className="text-xs text-stone-500 uppercase tracking-wider">
              出生时间
            </label>
            <input
              id="birthTime"
              type="time"
              value={birthTime}
              onChange={(e) => setBirthTime(e.target.value)}
              className="w-full px-4 py-2 border border-stone-300 rounded-md focus:ring-1 focus:ring-stone-500 focus:border-stone-500 bg-stone-50 font-serif"
              required
            />
          </div>
        </div>

        {/* Place */}
        <div className="flex flex-col space-y-2">
          <label htmlFor="birthPlace" className="text-xs text-stone-500 uppercase tracking-wider">
            出生地点 (省/市)
          </label>
          <input
            id="birthPlace"
            type="text"
            value={birthPlace}
            onChange={(e) => setBirthPlace(e.target.value)}
            placeholder="例如：北京、上海、广东广州"
            className="w-full px-4 py-2 border border-stone-300 rounded-md focus:ring-1 focus:ring-stone-500 focus:border-stone-500 bg-stone-50 font-serif placeholder-stone-400"
            required
          />
          <p className="text-xs text-stone-400 italic">* 用于校正真太阳时，务必准确。</p>
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={isLoading}
          className="w-full mt-4 bg-cinnabar hover:bg-red-800 text-white font-serif py-3 px-6 rounded-md shadow-md transition-all duration-300 transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
        >
          {isLoading ? (
            <span className="flex items-center">
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              推演中...
            </span>
          ) : (
            "开启命盘"
          )}
        </button>
      </form>
    </div>
  );
};

export default InputForm;