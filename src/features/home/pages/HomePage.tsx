// src/features/home/pages/HomePage.tsx

import {
  Activity,
  CalendarDays,
  CreditCard,
  ShieldCheck,
  Stethoscope,
  Users,
} from "lucide-react";

import { Button } from "@/components/ui/button";

export function HomePage() {
  const features = [
    {
      title: "Patient Management",
      description:
        "Manage patient profiles, medical history, and records with a modern workflow.",
      icon: Users,
    },
    {
      title: "Appointments",
      description:
        "Streamline scheduling and optimize clinic operations in real-time.",
      icon: CalendarDays,
    },
    {
      title: "Billing & Finance",
      description:
        "Track invoices, payments, insurance, and financial reporting effortlessly.",
      icon: CreditCard,
    },
    {
      title: "Doctors & Staff",
      description:
        "Organize employees, permissions, attendance, and operational access.",
      icon: Stethoscope,
    },
    {
      title: "Analytics Dashboard",
      description:
        "Monitor clinic performance with actionable insights and visual metrics.",
      icon: Activity,
    },
    {
      title: "Secure Infrastructure",
      description:
        "Enterprise-grade security and permission management for healthcare systems.",
      icon: ShieldCheck,
    },
  ];

  return (
    <div className="relative overflow-hidden">
      {/* Ambient Background */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-1/2 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-primary/10 blur-3xl" />

        <div className="absolute bottom-0 right-0 h-[300px] w-[300px] rounded-full bg-chart-2/10 blur-3xl" />

        <div className="absolute top-1/3 left-0 h-[250px] w-[250px] rounded-full bg-chart-3/10 blur-3xl" />
      </div>

      <div className="relative space-y-20">
        {/* Hero */}
        <section className="relative overflow-hidden rounded-[32px] border border-border/60 bg-gradient-to-br from-card via-card to-accent/30 px-6 py-14 shadow-sm md:px-12 md:py-20">
          {/* Decorative Overlay */}
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.08),transparent_30%)]" />

          <div className="relative grid gap-12 lg:grid-cols-2 lg:items-center">
            {/* Left */}
            <div className="space-y-8">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-1.5 text-xs font-medium text-primary shadow-sm">
                <div className="size-2 rounded-full bg-primary animate-pulse" />
                Modern Healthcare ERP Platform
              </div>

              {/* Heading */}
              <div className="space-y-5">
                <h1 className="max-w-2xl text-4xl font-black leading-tight tracking-tight text-foreground md:text-6xl">
                  Smarter Clinic
                  <span className="bg-gradient-to-r from-primary to-chart-2 bg-clip-text text-transparent">
                    {" "}
                    Operations
                  </span>
                  <br />
                  Built for Modern Healthcare
                </h1>

                <p className="max-w-xl text-base leading-7 text-muted-foreground md:text-lg">
                  Centralize appointments, patient records, staff, billing, and
                  analytics into one elegant ERP platform designed specifically
                  for clinics and healthcare organizations.
                </p>
              </div>

              {/* CTA */}
              <div className="flex flex-col gap-3 sm:flex-row">
                <Button
                  size="lg"
                  className="
                    rounded-2xl px-8 shadow-lg shadow-primary/20
                    transition-all duration-300
                    hover:scale-[1.02]
                  "
                >
                  Open Dashboard
                </Button>

                <Button
                  variant="outline"
                  size="lg"
                  className="
                    rounded-2xl border-border/60 bg-background/60 backdrop-blur-sm
                    hover:bg-accent/60
                  "
                >
                  Explore Features
                </Button>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-4 pt-4">
                {[
                  { value: "50+", label: "Clinics" },
                  { value: "120K+", label: "Patients" },
                  { value: "99.9%", label: "Uptime" },
                ].map((stat) => (
                  <div
                    key={stat.label}
                    className="
                      rounded-2xl border border-border/60
                      bg-background/70 p-4
                      backdrop-blur-sm
                    "
                  >
                    <div className="text-2xl font-bold text-foreground">
                      {stat.value}
                    </div>

                    <div className="mt-1 text-xs text-muted-foreground">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Hero Visual */}
            <div className="relative flex items-center justify-center">
              <div
                className="
                  relative w-full max-w-xl overflow-hidden rounded-[32px]
                  border border-border/60
                  bg-background/70
                  p-6
                  shadow-2xl
                  backdrop-blur-xl
                "
              >
                {/* Top Bar */}
                <div className="mb-6 flex items-center justify-between border-b border-border/60 pb-4">
                  <div>
                    <h3 className="text-sm font-semibold">Clinic Overview</h3>

                    <p className="text-xs text-muted-foreground">
                      Real-time healthcare operations
                    </p>
                  </div>

                  <div className="rounded-xl bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                    Live
                  </div>
                </div>

                {/* Dashboard Preview */}
                <div className="space-y-4">
                  {/* Metric Cards */}
                  <div className="grid grid-cols-2 gap-4">
                    {[
                      {
                        title: "Patients",
                        value: "2,451",
                      },
                      {
                        title: "Appointments",
                        value: "186",
                      },
                      {
                        title: "Doctors",
                        value: "24",
                      },
                      {
                        title: "Revenue",
                        value: "$84K",
                      },
                    ].map((card) => (
                      <div
                        key={card.title}
                        className="
                          rounded-2xl border border-border/60
                          bg-card/80 p-4
                        "
                      >
                        <div className="text-xs text-muted-foreground">
                          {card.title}
                        </div>

                        <div className="mt-2 text-2xl font-bold">
                          {card.value}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Chart Mock */}
                  <div
                    className="
                      rounded-2xl border border-border/60
                      bg-card/80 p-5
                    "
                  >
                    <div className="mb-4 flex items-center justify-between">
                      <div>
                        <h4 className="text-sm font-semibold">
                          Patient Growth
                        </h4>

                        <p className="text-xs text-muted-foreground">
                          Last 6 months
                        </p>
                      </div>

                      <div className="text-xs text-primary font-medium">
                        +18.2%
                      </div>
                    </div>

                    <div className="flex h-36 items-end gap-2">
                      {[35, 48, 40, 70, 60, 92, 80].map((h, i) => (
                        <div
                          key={i}
                          className="
                            flex-1 rounded-t-xl
                            bg-gradient-to-t from-primary to-chart-2
                            opacity-90
                          "
                          style={{
                            height: `${h}%`,
                          }}
                        />
                      ))}
                    </div>
                  </div>
                </div>

                {/* Glow */}
                <div className="pointer-events-none absolute -bottom-16 left-1/2 h-40 w-40 -translate-x-1/2 rounded-full bg-primary/20 blur-3xl" />
              </div>
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="space-y-10">
          <div className="space-y-3 text-center">
            <div className="inline-flex rounded-full bg-primary/10 px-4 py-1 text-xs font-medium text-primary">
              ERP Features
            </div>

            <h2 className="text-3xl font-black tracking-tight md:text-4xl">
              Everything Your Clinic Needs
            </h2>

            <p className="mx-auto max-w-2xl text-muted-foreground">
              A unified platform designed to simplify healthcare operations
              while improving patient experience and staff productivity.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {features.map((feature) => {
              const Icon = feature.icon;

              return (
                <div
                  key={feature.title}
                  className="
                    group relative overflow-hidden rounded-3xl
                    border border-border/60
                    bg-card/80 p-6
                    shadow-sm
                    transition-all duration-300

                    hover:-translate-y-1
                    hover:shadow-xl
                    hover:shadow-primary/10
                  "
                >
                  {/* Glow */}
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/0 via-primary/0 to-primary/5 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                  <div className="relative space-y-5">
                    <div
                      className="
                        flex size-14 items-center justify-center rounded-2xl
                        bg-primary/10 text-primary
                        shadow-sm
                      "
                    >
                      <Icon className="size-7" />
                    </div>

                    <div className="space-y-2">
                      <h3 className="text-lg font-semibold">{feature.title}</h3>

                      <p className="text-sm leading-6 text-muted-foreground">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* CTA */}
        <section
          className="
            relative overflow-hidden rounded-[32px]
            border border-border/60
            bg-gradient-to-br from-primary to-chart-2
            px-8 py-14 text-center text-primary-foreground
            shadow-2xl
          "
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.15),transparent_30%)]" />

          <div className="relative mx-auto max-w-3xl space-y-6">
            <h2 className="text-3xl font-black tracking-tight md:text-5xl">
              Empower Your Clinic with a Modern ERP
            </h2>

            <p className="text-base leading-7 text-primary-foreground/85 md:text-lg">
              Improve operational efficiency, patient care, and team
              collaboration through one centralized platform.
            </p>

            <div className="flex flex-col justify-center gap-3 pt-2 sm:flex-row">
              <Button
                size="lg"
                variant="secondary"
                className="
                  rounded-2xl
                  bg-white/15
                  text-white
                  backdrop-blur-sm
                  hover:bg-white/20
                "
              >
                Get Started
              </Button>

              <Button
                size="lg"
                variant="outline"
                className="
                  rounded-2xl
                  border-white/20
                  bg-transparent
                  text-white
                  hover:bg-white/10
                "
              >
                Learn More
              </Button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
