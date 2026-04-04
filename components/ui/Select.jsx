/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import { Check, ChevronDown } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

const Select = ({
  options,
  value,
  onChange,
  placeholder = "Select an option...",
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [menuStyle, setMenuStyle] = useState({});
  const [placement, setPlacement] = useState("bottom");
  const containerRef = useRef(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const updatePosition = () => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const spaceBelow = windowHeight - rect.bottom;
      const menuHeight = 280;

      if (spaceBelow < menuHeight && rect.top > menuHeight) {
        setPlacement("top");
        setMenuStyle({
          bottom: windowHeight - rect.top + 8,
          left: rect.left,
          width: rect.width,
        });
      } else {
        setPlacement("bottom");
        setMenuStyle({
          top: rect.bottom + 8,
          left: rect.left,
          width: rect.width,
        });
      }
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target) &&
        !event.target.closest(".select-portal-menu")
      ) {
        setIsOpen(false);
      }
    };

    const handleScrollOrResize = () => {
      if (isOpen) {
        updatePosition();
      }
    };

    if (isOpen) {
      updatePosition();
      window.addEventListener("scroll", handleScrollOrResize, true);
      window.addEventListener("resize", handleScrollOrResize);
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      window.removeEventListener("scroll", handleScrollOrResize, true);
      window.removeEventListener("resize", handleScrollOrResize);
    };
  }, [isOpen]);

  const handleSelect = (option) => {
    const optionValue = typeof option === "object" ? option.value : option;
    onChange(optionValue);
    setIsOpen(false);
  };

  const toggleOpen = () => {
    if (!isOpen) {
      updatePosition();
    }
    setIsOpen(!isOpen);
  };

  const getDisplayLabel = () => {
    if (!value) return placeholder;
    const selectedOption = options.find((opt) =>
      typeof opt === "object" ? opt.value === value : opt === value,
    );
    return typeof selectedOption === "object"
      ? selectedOption.label
      : selectedOption || value;
  };

  return (
    <div className="relative w-full" ref={containerRef}>
      {/* Trigger Button */}
      <button
        type="button"
        onClick={toggleOpen}
        className={`w-full bg-app-inner-bg border rounded-xl py-2.5 px-4 text-sm font-medium flex items-center justify-between transition-all duration-200 outline-none ${
          isOpen
            ? "border-foreground ring-2 ring-foreground/5 shadow-lg"
            : "border-border-color hover:border-foreground/20"
        }`}
      >
        <span
          className={value ? "text-foreground font-semibold" : "text-text-base"}
        >
          {getDisplayLabel()}
        </span>
        <ChevronDown
          className={`size-4 text-text-base transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {/* Dropdown Menu via Portal */}
      {isOpen &&
        mounted &&
        createPortal(
          <div
            className={`select-portal-menu fixed bg-background border border-border-color rounded-2xl shadow-2xl backdrop-blur-md overflow-hidden z-100 animate-fade-in-up duration-150 ${
              placement === "top" ? "origin-bottom" : "origin-top"
            }`}
            style={{
              ...(placement === "top"
                ? {
                    bottom: menuStyle.bottom,
                    left: menuStyle.left,
                    width: menuStyle.width,
                  }
                : {
                    top: menuStyle.top,
                    left: menuStyle.left,
                    width: menuStyle.width,
                  }),
            }}
          >
            <div className="max-h-60 overflow-y-auto p-1.5 space-y-1 font-montserrat">
              {options.map((option) => {
                const isObject = typeof option === "object";
                const optValue = isObject ? option.value : option;
                const optLabel = isObject ? option.label : option;
                const isSelected = value === optValue;

                return (
                  <button
                    key={optValue}
                    type="button"
                    onClick={() => handleSelect(option)}
                    className={`w-full text-left px-4 py-2.5 rounded-xl text-sm font-semibold flex items-center justify-between transition-all group ${
                      isSelected
                        ? "bg-foreground text-background"
                        : "text-text-base hover:bg-app-inner-bg hover:text-foreground"
                    }`}
                  >
                    <span>{optLabel}</span>
                    {isSelected && (
                      <Check className="size-4 animate-in fade-in scale-100" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>,
          document.body,
        )}
    </div>
  );
};

export default Select;
