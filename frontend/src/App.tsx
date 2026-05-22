import { SurveyPage } from "@/components/SurveyPage";
import { HttpSurveyApi } from "@/infrastructure/httpSurveyApi";

const surveyApi = new HttpSurveyApi();

export default function App() {
  return (
    <div className="app-shell">
      <div className="app-content">
        <SurveyPage api={surveyApi} />
      </div>
    </div>
  );
}
