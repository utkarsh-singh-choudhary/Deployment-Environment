import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import {
  Upload,
  Send,
  CheckCircle,
  Loader2,
  AlertCircle,
  FileText,
  User,
  Mail,
  Building2,
  BookOpen,
  Briefcase,
  X,
  Link2,
} from 'lucide-react';

const internshipRoles = [
  'Full-Stack Development',
  'AI / Machine Learning',
  'UI/UX Design',
  'Digital Marketing',
  'Cloud & DevOps',
  'Data Science',
  'Mobile Development',
  'Product Management',
  'Cybersecurity',
  'Brand Strategy',
];

export default function StudentTab() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    college: '',
    course: '',
    year: '',
    role: '',
    message: '',
  });
  const [resume, setResume] = useState<File | null>(null);
  const [fileUrl, setFileUrl] = useState('');
  const [uploadingFile, setUploadingFile] = useState(false);
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      alert('File size must be less than 5MB');
      return;
    }

    setResume(file);
    setUploadingFile(true);
    setFileUrl('');

    try {
      // Upload to file.io (free, no auth needed, 14-day expiry)
      const uploadData = new FormData();
      uploadData.append('file', file);

      const res = await fetch('https://file.io', {
        method: 'POST',
        body: uploadData,
      });

      const result = await res.json();
      if (result.link) {
        setFileUrl(result.link);
      } else {
        throw new Error('Upload failed');
      }
    } catch {
      // Fallback: just store the file name, admin can request it via email
      setFileUrl('');
    } finally {
      setUploadingFile(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.email || !formData.name || !formData.role) return;

    setStatus('loading');

    try {
      const payload = {
        email: formData.email,
        name: formData.name,
        college: formData.college,
        course: formData.course,
        year: formData.year,
        role: formData.role,
        message: formData.message,
        resumeFileName: resume ? resume.name : 'No file uploaded',
        resumeDownloadLink: fileUrl || 'Upload pending / failed — contact applicant directly',
        _subject: `Internship Application: ${formData.name} - ${formData.role}`,
        _template: 'table',
        _captcha: 'false',
      };

      const response = await fetch('https://formsubmit.co/ajax/choudharyutk@gmail.com', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        setStatus('success');
        setFormData({
          name: '',
          email: '',
          college: '',
          course: '',
          year: '',
          role: '',
          message: '',
        });
        setResume(null);
        setFileUrl('');
        setTimeout(() => setStatus('idle'), 6000);
      } else {
        throw new Error('Failed to send');
      }
    } catch {
      setStatus('error');
      setTimeout(() => setStatus('idle'), 5000);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-3xl mx-auto"
    >
      <div className="text-center mb-12">
        <h3 className="font-serif text-3xl lg:text-4xl text-pearl font-light mb-4">
          Apply for an <em className="text-gold not-italic">Internship</em>
        </h3>
        <p className="text-muted text-sm leading-relaxed font-light max-w-lg mx-auto">
          Join PrimeTechify&apos;s exclusive internship program. Work alongside industry veterans 
          on real projects that shape the future.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="grid sm:grid-cols-2 gap-5">
          <div className="relative">
            <User size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted" />
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="Full Name"
              required
              className="w-full pl-11 pr-4 py-4 bg-surface/50 border border-gold/10 rounded-lg text-pearl text-sm placeholder:text-muted focus:outline-none focus:border-gold/40 transition-colors"
            />
          </div>
          <div className="relative">
            <Mail size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted" />
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              placeholder="Email Address"
              required
              className="w-full pl-11 pr-4 py-4 bg-surface/50 border border-gold/10 rounded-lg text-pearl text-sm placeholder:text-muted focus:outline-none focus:border-gold/40 transition-colors"
            />
          </div>
        </div>

        <div className="grid sm:grid-cols-2 gap-5">
          <div className="relative">
            <Building2 size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted" />
            <input
              type="text"
              value={formData.college}
              onChange={(e) => setFormData({ ...formData, college: e.target.value })}
              placeholder="College / University"
              className="w-full pl-11 pr-4 py-4 bg-surface/50 border border-gold/10 rounded-lg text-pearl text-sm placeholder:text-muted focus:outline-none focus:border-gold/40 transition-colors"
            />
          </div>
          <div className="relative">
            <BookOpen size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted" />
            <input
              type="text"
              value={formData.course}
              onChange={(e) => setFormData({ ...formData, course: e.target.value })}
              placeholder="Course / Branch"
              className="w-full pl-11 pr-4 py-4 bg-surface/50 border border-gold/10 rounded-lg text-pearl text-sm placeholder:text-muted focus:outline-none focus:border-gold/40 transition-colors"
            />
          </div>
        </div>

        <div className="grid sm:grid-cols-2 gap-5">
          <div className="relative">
            <Briefcase size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted" />
            <select
              value={formData.role}
              onChange={(e) => setFormData({ ...formData, role: e.target.value })}
              required
              className="w-full pl-11 pr-4 py-4 bg-surface/50 border border-gold/10 rounded-lg text-pearl text-sm focus:outline-none focus:border-gold/40 transition-colors appearance-none cursor-pointer"
            >
              <option value="" disabled className="bg-surface text-muted">
                Select Internship Role
              </option>
              {internshipRoles.map((role) => (
                <option key={role} value={role} className="bg-surface text-pearl">
                  {role}
                </option>
              ))}
            </select>
          </div>
          <div className="relative">
            <input
              type="text"
              value={formData.year}
              onChange={(e) => setFormData({ ...formData, year: e.target.value })}
              placeholder="Year of Study (e.g. 3rd Year)"
              className="w-full px-4 py-4 bg-surface/50 border border-gold/10 rounded-lg text-pearl text-sm placeholder:text-muted focus:outline-none focus:border-gold/40 transition-colors"
            />
          </div>
        </div>

        <textarea
          value={formData.message}
          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
          placeholder="Why do you want to join PrimeTechify? Tell us about your passion and goals..."
          rows={4}
          className="w-full px-4 py-4 bg-surface/50 border border-gold/10 rounded-lg text-pearl text-sm placeholder:text-muted focus:outline-none focus:border-gold/40 transition-colors resize-none"
        />

        {/* Resume Upload */}
        <div className="relative">
          <input
            ref={fileInputRef}
            type="file"
            accept=".pdf,.doc,.docx"
            onChange={handleFileChange}
            className="hidden"
          />
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            disabled={uploadingFile}
            className={`w-full flex items-center justify-center gap-3 px-4 py-4 border border-dashed rounded-lg transition-colors ${
              resume
                ? 'border-gold/30 bg-gold/5 text-gold'
                : 'border-gold/10 bg-surface/30 text-muted hover:border-gold/30 hover:text-cream'
            } disabled:opacity-60`}
            data-hover
          >
            {uploadingFile ? (
              <>
                <Loader2 size={18} className="animate-spin" />
                <span className="text-sm">Uploading file...</span>
              </>
            ) : resume ? (
              <>
                <FileText size={18} />
                <span className="text-sm">{resume.name}</span>
                {fileUrl && (
                  <a
                    href={fileUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="ml-1 p-1 hover:bg-gold/10 rounded"
                    title="Open file"
                  >
                    <Link2 size={14} />
                  </a>
                )}
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setResume(null);
                    setFileUrl('');
                  }}
                  className="ml-2 p-1 hover:bg-gold/10 rounded"
                >
                  <X size={14} />
                </button>
              </>
            ) : (
              <>
                <Upload size={18} />
                <span className="text-sm">Upload Resume (PDF, DOC, DOCX) — Max 5MB</span>
              </>
            )}
          </button>
          {fileUrl && (
            <p className="text-[10px] text-gold/60 mt-2 flex items-center gap-1">
              <CheckCircle size={10} />
              File uploaded successfully. Link will be sent with your application.
            </p>
          )}
        </div>

        <button
          type="submit"
          disabled={status === 'loading' || status === 'success'}
          className="w-full group inline-flex items-center justify-center gap-2 px-8 py-4 bg-gold text-ink font-display font-medium text-xs tracking-[0.15em] uppercase hover:bg-gold-light transition-all duration-300 disabled:opacity-70 rounded-lg"
          data-hover
        >
          {status === 'loading' ? (
            <>
              <Loader2 size={14} className="animate-spin" />
              Submitting Application...
            </>
          ) : status === 'success' ? (
            <>
              <CheckCircle size={14} />
              Application Submitted Successfully
            </>
          ) : status === 'error' ? (
            <>
              <AlertCircle size={14} />
              Something Went Wrong. Try Again.
            </>
          ) : (
            <>
              Submit Application
              <Send size={14} className="group-hover:translate-x-1 transition-transform" />
            </>
          )}
        </button>
      </form>
    </motion.div>
  );
}
