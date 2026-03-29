"use client"

import { useRef, useCallback, useEffect } from "react"
import { 
  Bold, 
  Italic, 
  Underline, 
  List, 
  ListOrdered, 
  Quote,
  Heading1,
  Heading2,
  Heading3,
  Link as LinkIcon,
  ImageIcon,
  Undo,
  Redo,
  Code,
  AlignLeft,
  AlignCenter,
  AlignRight
} from "lucide-react"
import { Button } from "@/components/ui/button"

interface RichTextEditorProps {
  value: string
  onChange: (value: string) => void
  placeholder?: string
}

export function RichTextEditor({ value, onChange, placeholder }: RichTextEditorProps) {
  const editorRef = useRef<HTMLDivElement>(null)
  const isInitialMount = useRef(true)

  // Set initial content only once
  useEffect(() => {
    if (isInitialMount.current && editorRef.current && value) {
      editorRef.current.innerHTML = value
      isInitialMount.current = false
    }
  }, [value])

  const execCommand = useCallback((command: string, commandValue?: string) => {
    editorRef.current?.focus()
    document.execCommand(command, false, commandValue)
    if (editorRef.current) {
      onChange(editorRef.current.innerHTML)
    }
  }, [onChange])

  const handleInput = useCallback(() => {
    if (editorRef.current) {
      onChange(editorRef.current.innerHTML)
    }
  }, [onChange])

  const handlePaste = useCallback((e: React.ClipboardEvent) => {
    e.preventDefault()
    const text = e.clipboardData.getData("text/plain")
    document.execCommand("insertText", false, text)
  }, [])

  const insertLink = () => {
    const url = prompt("Enter URL:")
    if (url) {
      execCommand("createLink", url)
    }
  }

  const insertImage = () => {
    const url = prompt("Enter image URL:")
    if (url) {
      execCommand("insertImage", url)
    }
  }

  const ToolbarButton = ({ 
    onClick, 
    icon: Icon, 
    title,
    label
  }: { 
    onClick: () => void
    icon?: typeof Bold
    title: string
    label?: string
  }) => (
    <Button
      type="button"
      variant="ghost"
      size="sm"
      onClick={(e) => {
        e.preventDefault()
        onClick()
      }}
      className="h-8 px-2 text-xs font-medium hover:bg-foreground/10"
      title={title}
    >
      {Icon ? <Icon className="h-4 w-4" /> : label}
    </Button>
  )

  const ToolbarDivider = () => (
    <div className="w-px h-6 bg-border mx-1" />
  )

  return (
    <div className="border border-border rounded-lg overflow-hidden bg-background">
      {/* Toolbar */}
      <div className="flex flex-wrap items-center gap-0.5 p-2 border-b border-border bg-muted/30">
        <ToolbarButton onClick={() => execCommand("undo")} icon={Undo} title="Undo" />
        <ToolbarButton onClick={() => execCommand("redo")} icon={Redo} title="Redo" />
        
        <ToolbarDivider />
        
        <ToolbarButton onClick={() => execCommand("formatBlock", "h1")} label="H1" title="Heading 1" />
        <ToolbarButton onClick={() => execCommand("formatBlock", "h2")} label="H2" title="Heading 2" />
        <ToolbarButton onClick={() => execCommand("formatBlock", "h3")} label="H3" title="Heading 3" />
        <ToolbarButton onClick={() => execCommand("formatBlock", "p")} label="P" title="Paragraph" />
        
        <ToolbarDivider />
        
        <ToolbarButton onClick={() => execCommand("bold")} icon={Bold} title="Bold (Ctrl+B)" />
        <ToolbarButton onClick={() => execCommand("italic")} icon={Italic} title="Italic (Ctrl+I)" />
        <ToolbarButton onClick={() => execCommand("underline")} icon={Underline} title="Underline (Ctrl+U)" />
        <ToolbarButton onClick={() => execCommand("formatBlock", "pre")} icon={Code} title="Code Block" />
        
        <ToolbarDivider />
        
        <ToolbarButton onClick={() => execCommand("justifyLeft")} icon={AlignLeft} title="Align Left" />
        <ToolbarButton onClick={() => execCommand("justifyCenter")} icon={AlignCenter} title="Align Center" />
        <ToolbarButton onClick={() => execCommand("justifyRight")} icon={AlignRight} title="Align Right" />
        
        <ToolbarDivider />
        
        <ToolbarButton onClick={() => execCommand("insertUnorderedList")} icon={List} title="Bullet List" />
        <ToolbarButton onClick={() => execCommand("insertOrderedList")} icon={ListOrdered} title="Numbered List" />
        <ToolbarButton onClick={() => execCommand("formatBlock", "blockquote")} icon={Quote} title="Quote" />
        
        <ToolbarDivider />
        
        <ToolbarButton onClick={insertLink} icon={LinkIcon} title="Insert Link" />
        <ToolbarButton onClick={insertImage} icon={ImageIcon} title="Insert Image" />
      </div>
      
      {/* Editor */}
      <div
        ref={editorRef}
        contentEditable
        dir="ltr"
        suppressContentEditableWarning
        className="min-h-[300px] p-4 focus:outline-none prose prose-sm max-w-none [&>*]:text-left"
        onInput={handleInput}
        onPaste={handlePaste}
        data-placeholder={placeholder || "Start writing..."}
        style={{
          minHeight: "300px",
          direction: "ltr",
          textAlign: "left",
          writingMode: "horizontal-tb",
        }}
      />
      
      <style jsx>{`
        [contenteditable]:empty:before {
          content: attr(data-placeholder);
          color: hsl(var(--muted-foreground));
          pointer-events: none;
          position: absolute;
        }
        [contenteditable] {
          position: relative;
        }
        [contenteditable] * {
          direction: ltr !important;
          unicode-bidi: embed !important;
          text-align: left;
        }
      `}</style>
    </div>
  )
}
