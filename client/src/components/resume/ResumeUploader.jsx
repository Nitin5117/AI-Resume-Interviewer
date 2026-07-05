import { useRef, useState } from "react";
import { UploadCloud, FileText, X } from "lucide-react";
import toast from "react-hot-toast";

import Button from "../ui/Button";
import { uploadResume } from "../../services/resumeService";

const ResumeUploader = ({ setAnalysis }) => {
  const inputRef = useRef(null);

  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const chooseFile = () => {
    inputRef.current.click();
  };

  const handleFileChange = (e) => {
    const selected = e.target.files[0];

    if (!selected) return;

    if (selected.type !== "application/pdf") {
      toast.error("Only PDF files are allowed");
      return;
    }

    if (selected.size > 5 * 1024 * 1024) {
      toast.error("Maximum file size is 5 MB");
      return;
    }

    setFile(selected);
  };

  const removeFile = () => {
    setFile(null);
    inputRef.current.value = "";
  };

  const handleUpload = async () => {
    if (!file) return;

    try {
      setLoading(true);

      const response = await uploadResume(file);

      toast.success("Resume analyzed successfully!");

      setAnalysis(response.data);
    } catch (error) {
      toast.error(error.response?.data?.message || "Resume upload failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="border-2 border-dashed border-slate-700 rounded-3xl p-16 text-center bg-slate-900">
      {!file ? (
        <>
          <UploadCloud size={70} className="mx-auto text-indigo-400" />

          <h2 className="mt-6 text-2xl font-semibold">Drag & Drop Resume</h2>

          <p className="mt-2 text-slate-400">or click below to browse</p>

          <Button className="mt-8" onClick={chooseFile}>
            Choose PDF
          </Button>

          <p className="mt-6 text-sm text-slate-500">PDF • Max 5 MB</p>
        </>
      ) : (
        <div className="max-w-xl mx-auto">
          <div className="flex items-center justify-between bg-slate-800 rounded-xl p-5">
            <div className="flex items-center gap-4">
              <FileText className="text-indigo-400" size={40} />

              <div className="text-left">
                <h3>{file.name}</h3>

                <p className="text-slate-400 text-sm">
                  {(file.size / 1024 / 1024).toFixed(2)} MB
                </p>
              </div>
            </div>

            <button onClick={removeFile}>
              <X className="text-red-400" />
            </button>
          </div>

          <Button
            className="mt-8 w-full"
            onClick={handleUpload}
            disabled={loading}
          >
            {loading ? "Analyzing Resume..." : "Analyze Resume"}
          </Button>
        </div>
      )}

      <input
        hidden
        ref={inputRef}
        type="file"
        accept=".pdf"
        onChange={handleFileChange}
      />
    </div>
  );
};

export default ResumeUploader;
