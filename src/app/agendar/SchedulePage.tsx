"use client";

import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CalendarIcon, Clock, CheckCircle } from "lucide-react";
import { toast } from "sonner";

const timeSlots = ["09:00", "09:30", "10:00", "10:30", "11:00", "11:30", "14:00", "14:30", "15:00", "15:30", "16:00", "16:30"];
const services = ["Atestado de Residência", "Licenças e Autorizações", "Apoio Social", "Requerimentos", "Outro"];

const SchedulePage = () => {
  const [date, setDate] = useState<Date | undefined>();
  const [time, setTime] = useState("");
  const [service, setService] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!date || !time || !service || !name || !email) {
      toast.error("Preencha todos os campos obrigatórios.");
      return;
    }
    setSubmitted(true);
    toast.success("Atendimento agendado com sucesso!");
  };

  if (submitted) {
    return (
      <div className="min-h-screen">
        <Header />
        <main className="section-padding">
          <div className="container max-w-lg mx-auto text-center">
            <CheckCircle className="w-16 h-16 text-success mx-auto mb-4" />
            <h1 className="font-display text-3xl font-bold text-foreground mb-3">Atendimento Agendado</h1>
            <p className="text-muted-foreground mb-2">
              Data: {date?.toLocaleDateString('pt-PT')} às {time}
            </p>
            <p className="text-muted-foreground mb-6">Serviço: {service}</p>
            <Button onClick={() => { setSubmitted(false); setDate(undefined); setTime(""); setService(""); setName(""); setEmail(""); setPhone(""); }}>
              Agendar Novo Atendimento
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <section className="section-padding bg-section-alt">
          <div className="container max-w-4xl mx-auto">
            <div className="text-center mb-10">
              <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground">Agendar Atendimento</h1>
              <p className="text-muted-foreground mt-3">Escolha o dia, hora e serviço pretendido.</p>
            </div>

            <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Calendar */}
              <div className="bg-card rounded-2xl border p-6 flex flex-col items-center">
                <h3 className="font-display font-semibold text-foreground mb-4 flex items-center gap-2">
                  <CalendarIcon className="w-5 h-5 text-primary" /> Selecione a Data
                </h3>
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  disabled={(d) => d < new Date() || d.getDay() === 0 || d.getDay() === 6}
                  className="pointer-events-auto"
                />

                {date && (
                  <div className="mt-6 w-full">
                    <h4 className="font-medium text-foreground text-sm mb-3 flex items-center gap-2">
                      <Clock className="w-4 h-4 text-primary" /> Horários Disponíveis
                    </h4>
                    <div className="grid grid-cols-3 gap-2">
                      {timeSlots.map((slot) => (
                        <button
                          key={slot}
                          type="button"
                          onClick={() => setTime(slot)}
                          className={`py-2 rounded-lg text-sm font-medium transition-colors ${
                            time === slot
                              ? "bg-primary text-primary-foreground"
                              : "bg-muted text-muted-foreground hover:text-foreground"
                          }`}
                        >
                          {slot}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Details */}
              <div className="bg-card rounded-2xl border p-6 space-y-5">
                <h3 className="font-display font-semibold text-foreground mb-2">Dados do Agendamento</h3>

                <div className="space-y-2">
                  <Label>Serviço *</Label>
                  <Select value={service} onValueChange={setService}>
                    <SelectTrigger><SelectValue placeholder="Selecione o serviço" /></SelectTrigger>
                    <SelectContent>
                      {services.map((s) => <SelectItem key={s} value={s}>{s}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Nome Completo *</Label>
                  <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="O seu nome" required />
                </div>

                <div className="space-y-2">
                  <Label>Email *</Label>
                  <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="email@exemplo.pt" required />
                </div>

                <div className="space-y-2">
                  <Label>Telefone (opcional)</Label>
                  <Input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="+351 XXX XXX XXX" />
                </div>

                {date && time && (
                  <div className="bg-primary/5 rounded-lg p-4 text-sm">
                    <p className="font-medium text-foreground">Resumo:</p>
                    <p className="text-muted-foreground mt-1">📅 {date.toLocaleDateString('pt-PT')} às {time}</p>
                    {service && <p className="text-muted-foreground">🏛️ {service}</p>}
                  </div>
                )}

                <Button type="submit" className="w-full" size="lg">
                  Confirmar Agendamento
                </Button>
              </div>
            </form>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default SchedulePage;
