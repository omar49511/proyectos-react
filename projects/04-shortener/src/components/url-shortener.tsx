"use client";

import type React from "react";

import { useState, useEffect } from "react";
import { PlusCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import UrlList from "@/components/url-list";
import { saveUrl, getUrls } from "@/lib/url-utils";

export default function UrlShortener() {
  const [url, setUrl] = useState("");
  const [customName, setCustomName] = useState("");
  const [urls, setUrls] = useState<
    Array<{ original: string; shortened: string; createdAt: number }>
  >([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  // Set to 1 to show pagination after the first item
  const itemsPerPage = 1;

  useEffect(() => {
    const storedUrls = getUrls();
    setUrls(storedUrls);
    setTotalPages(Math.ceil(storedUrls.length / itemsPerPage));

    // Add some test data if needed for testing pagination
    if (process.env.NODE_ENV === "development" && storedUrls.length === 0) {
      const testData = [
        {
          original: "https://example.com/test1",
          shortened: "test1",
          createdAt: Date.now(),
        },
        {
          original: "https://example.com/test2",
          shortened: "test2",
          createdAt: Date.now() - 1000,
        },
        {
          original: "https://example.com/test3",
          shortened: "test3",
          createdAt: Date.now() - 2000,
        },
      ];
      // Uncomment the next line to add test data
      // setUrls(testData);
      // saveUrl(testData);
      // setTotalPages(Math.ceil(testData.length / itemsPerPage));
    }
  }, [itemsPerPage]);

  // Update pagination when URLs change
  useEffect(() => {
    setTotalPages(Math.ceil(urls.length / itemsPerPage));
  }, [urls, itemsPerPage]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!url || !url.trim() || !isValidUrl(url)) {
      toast("Por favor, ingresa una URL válida");
      return;
    }

    if (!customName || !customName.trim()) {
      toast("Por favor, ingresa un nombre para tu URL acortada");
      return;
    }

    if (!isValidCustomName(customName)) {
      toast("El nombre solo puede contener letras, números y guiones");
      return;
    }

    // Check if the custom name already exists
    if (urls.some((item) => item.shortened === customName)) {
      toast("Este nombre ya está en uso. Por favor, elige otro");
      return;
    }

    const newUrl = {
      original: url,
      shortened: customName,
      createdAt: Date.now(),
    };

    const updatedUrls = [newUrl, ...urls];
    setUrls(updatedUrls);
    saveUrl(updatedUrls);
    setTotalPages(Math.ceil(updatedUrls.length / itemsPerPage));
    setUrl("");
    setCustomName("");

    toast(`Tu URL ha sido acortada como: omar.link/${customName}`);
  };

  const isValidUrl = (string: string) => {
    try {
      new URL(string);
      return true;
    } catch (_) {
      return false;
    }
  };

  const isValidCustomName = (name: string) => {
    const regex = /^[a-zA-Z0-9-_]+$/;
    return regex.test(name);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const paginatedUrls = urls.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <main className="min-h-screen flex flex-col items-center p-6 bg-gradient-to-br from-indigo-100 to-purple-200 bg-fixed">
      <div className="w-full max-w-3xl">
        <Card
          className="glass p-8 rounded-xl relative overflow-hidden border border-indigo-300/50 shadow-[0_0_15px_rgba(123,104,238,0.5)]"
          style={{
            backdropFilter: "blur(12px)",
            WebkitBackdropFilter: "blur(12px)",
            background:
              "linear-gradient(135deg, rgba(255,255,255,0.2) 0%, rgba(123,104,238,0.1) 100%)",
            boxShadow:
              "0 8px 32px 0 rgba(31, 38, 135, 0.2), inset 0 0 0 1px rgba(255,255,255,0.1), 0 0 20px 2px rgba(123,104,238,0.4)",
          }}
        >
          <div className="absolute -inset-[1px] bg-gradient-to-r from-indigo-400/20 via-purple-300/20 to-indigo-400/20 rounded-xl blur-[2px] z-[-1]"></div>
          <div
            className="absolute -inset-[3px] bg-gradient-to-r from-indigo-500/10 via-purple-400/10 to-indigo-500/10 rounded-xl blur-[5px] z-[-2] animate-pulse"
            style={{ animationDuration: "3s" }}
          ></div>

          <h1 className="text-3xl font-bold text-center mb-8 text-indigo-800 drop-shadow-[0_0_2px_rgba(123,104,238,0.5)]">
            Acortador de Enlaces
          </h1>

          <form onSubmit={handleSubmit} className="mb-8 space-y-4">
            <div className="space-y-2">
              <Label htmlFor="original-url" className="text-indigo-700">
                URL Original
              </Label>
              <Input
                id="original-url"
                type="url"
                placeholder="https://ejemplo.com/ruta/muy/larga"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                className="glass-input border-indigo-300/50 focus-visible:ring-indigo-500"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="custom-name" className="text-indigo-700">
                Nombre Personalizado
              </Label>
              <div className="flex items-center">
                <span className="bg-indigo-100/70 text-indigo-800 px-3 py-2 border border-r-0 border-indigo-300/50 rounded-l-md backdrop-blur-md">
                  omar.link/
                </span>
                <Input
                  id="custom-name"
                  type="text"
                  placeholder="tutotype"
                  value={customName}
                  onChange={(e) => setCustomName(e.target.value)}
                  className="glass-input border-indigo-300/50 focus-visible:ring-indigo-500 rounded-l-none"
                />
              </div>
              <p className="text-xs text-indigo-600">
                Solo letras, números y guiones. Sin espacios ni caracteres
                especiales.
              </p>
            </div>

            <Button
              type="submit"
              className="w-full bg-indigo-600/90 hover:bg-indigo-700 text-white mt-4 backdrop-blur-md shadow-md hover:shadow-lg transition-all"
            >
              <PlusCircle className="mr-2 h-4 w-4" />
              Acortar URL
            </Button>
          </form>

          <UrlList
            urls={paginatedUrls}
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
            baseUrl="omar.link"
          />
        </Card>
      </div>
    </main>
  );
}
