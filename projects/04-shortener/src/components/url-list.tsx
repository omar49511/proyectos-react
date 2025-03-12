"use client";

import { useState } from "react";
import { Copy, ExternalLink, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { toast } from "sonner";

interface UrlListProps {
  urls: Array<{ original: string; shortened: string; createdAt: number }>;
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  baseUrl: string;
}

export default function UrlList({
  urls,
  currentPage,
  totalPages,
  onPageChange,
  baseUrl,
}: UrlListProps) {
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const allUrls = urls.length > 0;

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(`${baseUrl}/${text}`);
    setCopiedId(id);
    toast(`El enlace ${baseUrl}/${text} ha sido copiado al portapapeles.`);

    setTimeout(() => {
      setCopiedId(null);
    }, 2000);
  };

  const formatDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleDateString("es-ES", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const truncateUrl = (url: string, maxLength = 40) => {
    return url.length > maxLength ? url.substring(0, maxLength) + "..." : url;
  };

  if (!allUrls) {
    return (
      <div className="text-center py-8 text-purple-700">
        No hay URLs acortadas. ¡Agrega una para comenzar!
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-purple-800 mb-4">
        Enlaces acortados
      </h2>

      <div className="space-y-3">
        {urls.map((item) => (
          <Card key={item.shortened} className="glass-card p-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div className="flex-1 min-w-0">
                <p className="text-sm text-gray-500 mb-1">
                  {formatDate(item.createdAt)}
                </p>
                <p
                  className="text-purple-900 font-medium truncate"
                  title={item.original}
                >
                  {truncateUrl(item.original)}
                </p>
                <p className="text-purple-600 font-bold">
                  {baseUrl}/{item.shortened}
                </p>
              </div>

              <div className="flex gap-2 mt-2 sm:mt-0">
                <Button
                  variant="outline"
                  size="sm"
                  className="glass-button text-purple-700"
                  onClick={() =>
                    copyToClipboard(item.shortened, item.shortened)
                  }
                >
                  {copiedId === item.shortened ? (
                    "¡Copiado!"
                  ) : (
                    <>
                      <Copy className="h-4 w-4 mr-1" />
                      Copiar
                    </>
                  )}
                </Button>

                <Button
                  variant="outline"
                  size="sm"
                  className="glass-button text-purple-700"
                  onClick={() =>
                    window.open(
                      `https://${baseUrl}/${item.shortened}`,
                      "_blank"
                    )
                  }
                >
                  <ExternalLink className="h-4 w-4 mr-1" />
                  Abrir
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {totalPages > 1 && (
        <div className="mt-8 flex flex-col items-center">
          <p className="text-sm text-purple-700 mb-3">
            Página {currentPage} de {totalPages}
          </p>

          <div className="glass-card p-2 rounded-lg flex items-center justify-center gap-2 shadow-[0_0_10px_rgba(168,139,250,0.3)]">
            <Button
              variant="outline"
              size="icon"
              className={`rounded-full w-10 h-10 flex items-center justify-center ${
                currentPage === 1
                  ? "opacity-50 cursor-not-allowed"
                  : "glass-button hover:bg-purple-100/50 text-purple-700"
              }`}
              onClick={() => onPageChange(currentPage - 1)}
              disabled={currentPage === 1}
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>

            <div className="flex items-center gap-1 px-2">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                (page) => (
                  <Button
                    key={page}
                    variant={currentPage === page ? "default" : "outline"}
                    size="sm"
                    className={
                      currentPage === page
                        ? "bg-purple-600/90 hover:bg-purple-700 text-white shadow-md min-w-[36px] h-9"
                        : "glass-button text-purple-700 hover:bg-purple-100/50 min-w-[36px] h-9"
                    }
                    onClick={() => onPageChange(page)}
                  >
                    {page}
                  </Button>
                )
              )}
            </div>

            <Button
              variant="outline"
              size="icon"
              className={`rounded-full w-10 h-10 flex items-center justify-center ${
                currentPage === totalPages
                  ? "opacity-50 cursor-not-allowed"
                  : "glass-button hover:bg-purple-100/50 text-purple-700"
              }`}
              onClick={() => onPageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              <ChevronRight className="h-5 w-5" />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
