import { useDropzone } from "react-dropzone";
import "../assets/scss/components/FileDropzone.scss";

const FileDropzone = ({ onFileSelect, accept, label, preview }) => {
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept,
    multiple: false,
    onDrop: (files) => {
      if (files && files.length > 0) {
        onFileSelect(files[0]);
      }
    }
  });

  return (
    <div {...getRootProps()} className={`dropzone ${isDragActive ? "active" : ""}`}>
      <input {...getInputProps()} />

      {
				preview ? (
					<>
            <div className="drop-content">
              <img src={preview} alt="preview" className="drop-preview" />
              <p className="drop-label">{label}</p>
              <span className="drop-text">Drag & drop or click to upload</span>
            </div>
          </>
				) : (
					<div className="drop-content">
						<p className="drop-label">{label}</p>
						<span className="drop-text">Drag & drop or click to upload</span>
					</div>
				)
			}
    </div>
  );
};

export default FileDropzone;